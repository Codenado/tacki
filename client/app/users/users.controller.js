'use strict';

angular.module('tackiApp')
  .controller('UsersCtrl', function ($scope, $stateParams, $http) {
    var url ='/api/tacks/' + $stateParams.id
    $scope.tacks = []
    //console.log($stateParams.id)

    $http.get(url).then(response => {
      $scope.tacks = response.data;
      console.log($scope.tacks)
    });

  });
