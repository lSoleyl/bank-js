bankjs.element('overview', ['$interval', 'account', '$scope', function($interval, account, $scope) {
  $scope.accounts = function() {
    return account.all()
  }

  $scope.time = (new Date()).toLocaleTimeString()
  $interval(function() {
    $scope.time = (new Date()).toLocaleTimeString()
  }, 1000)
}])

