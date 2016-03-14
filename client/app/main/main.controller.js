'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.tacks = [];

    $http.get('/api/tacks').then(response => {
      this.tacks = response.data;
      console.log(this.tacks)
      socket.syncUpdates('tack', this.tacks);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('tack');
    });
  }

  addThing() {
    if (this.newThing) {
      this.$http.post('/api/tacks', { url: this.newThing,
                                      name: 'fun', description: 'notfun'
                                                      });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }
}

angular.module('tackiApp')
  .controller('MainController', MainController);

})();
