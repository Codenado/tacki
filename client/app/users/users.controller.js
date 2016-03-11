'use strict';

angular.module('tackiApp')
  .controller('UsersCtrl', function ($scope, $stateParams, $http) {
    var url ='api/tacks/' + $stateParams.id
    $scope.message = $stateParams.id;
    //console.log($stateParams.id)

    $http.get(url, function(data){
      console.log(data)
    })

  });
