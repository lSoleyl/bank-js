bankjs.directive('overview', ['$interval', function($interval) {
  
  return {
    templateUrl:'templates/overview.html',
    restrict:'E',
    link:function($scope) {
      $scope.time = (new Date()).toLocaleTimeString()
      $interval(function() {
        $scope.time = (new Date()).toLocaleTimeString()
      }, 1000)
    }
  }
}])

