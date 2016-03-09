'use strict';

angular.module('tackiApp')
  .controller('UsersCtrl', function ($scope, $stateParams) {
    $scope.message = $stateParams.id;
    console.log($stateParams.id)
  });
