var bankjs = angular.module('bankjs', [])

bankjs.controller('overview', ['$scope', '$interval', function($scope, $interval) {
  $scope.time = (new Date()).toLocaleTimeString()
  $interval(function() {
    $scope.time = (new Date()).toLocaleTimeString()
  }, 1000)
}])