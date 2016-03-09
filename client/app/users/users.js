'use strict';

angular.module('tackiApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('users', {
        url: '/users/:id',
        templateUrl: 'app/users/users.html',
        controller: 'UsersCtrl'
      });
  });
