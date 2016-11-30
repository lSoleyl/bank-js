bankjs.element('overview', ['$interval', 'account', '$scope', '$rootScope', function($interval, account, $scope, $rootScope) {
  $scope.accounts = function() {
    var accs = account.all()
    if ($rootScope.settings && $rootScope.settings.show_system_account)
      return accs
    
    return _.filter(accs, function(acc) { return acc !== account.bank })
  }

  $scope.time = (new Date()).toLocaleTimeString()
  $interval(function() {
    $scope.time = (new Date()).toLocaleTimeString()
  }, 1000)
}])

