bankjs.element('overview', ['$interval', 'account', '$scope', '$rootScope', function($interval, account, $scope, $rootScope) {
  $scope.accounts = function() {
    return account.all($rootScope.settings && !$rootScope.settings.show_system_account)
  }

  $scope.time = (new Date()).toLocaleTimeString()
  $interval(function() {
    $scope.time = (new Date()).toLocaleTimeString()
  }, 1000)
}])

