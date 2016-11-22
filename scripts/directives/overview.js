bankjs.directive('overview', ['$interval', 'account', 'transaction', function($interval, account, transaction) {
  
  return {
    templateUrl:'templates/overview.html',
    restrict:'E',
    link:function($scope) {
      $scope.accounts = function() {
        return account.all()
      }

      $scope.time = (new Date()).toLocaleTimeString()
      $interval(function() {
        $scope.time = (new Date()).toLocaleTimeString()
      }, 1000)
    }
  }
}])

