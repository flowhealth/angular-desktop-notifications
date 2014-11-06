(function() {
 'use strict';
  angular.module('ngDesktopNotifications', []).factory('desktopNotificationsService', function() {
    var self = {}
    notify.config({pageVisibility: false, autoClose: 0});

    function dnLog (message) {
      console.log('ngDesktopNotification: ' + message);
    }

    function notificationIsAllowed(){
      return notify.permissionLevel() === notify.PERMISSION_GRANTED;
    }

    function askForEnableNotification(){
      if (notify.permissionLevel() === notify.PERMISSION_DEFAULT){
        notify.requestPermission();
      };
    }

    function allParamsIsValid (title, body, imagePath) {
      var titleIsString = (typeof(title) === 'string'),
        bodyIsString = (typeof(body) === 'string'),
        imagePathIsString = (typeof(imagePath) === 'string'),
        paramsIsValid = (titleIsString && bodyIsString && imagePathIsString);

      if (!paramsIsValid) {
        dnLog('passed params invalid');
      }

      return paramsIsValid;
    }

    self.pushNotify = function(title, body, imagePath) {
      if (notify.isSupported && notificationIsAllowed() && allParamsIsValid(title, body, imagePath)){
        notify.createNotification(title, {body: body, icon: imagePath});
      } else {
        askForEnableNotification();
      }
    }

    return self;
  });
}).call(this);

