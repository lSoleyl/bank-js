bankjs.element('transferMoney', ['$scope', '$rootScope', 'account', 'transaction', function($scope, $rootScope, account, transaction) {
  function reset() {
    $scope.transfer = {from:undefined, to:undefined, amount:undefined, description:undefined}
  }

  $scope.accounts = function() {
    return account.all($rootScope.settings && !$rootScope.settings.show_system_account)
  }

  $scope.sameAccount = function() {
    return $scope.transfer.to !== undefined && $scope.transfer.from === $scope.transfer.to
  }

  $scope.validAmount = function() {
    return parseFloat($scope.transfer.amount) > 0
  }

  $scope.formValid = function() {
    return $scope.transfer.from && $scope.transfer.to && !$scope.sameAccount() && $scope.validAmount()
  }

  $scope.transferMoney = function() {
    var transfer = $scope.transfer
    transaction.add(transfer.from, transfer.to, parseFloat(transfer.amount)*100, transfer.description)
    //Restore scope after transaction
    reset()
    //Break in MVC, but lets switch to overview
    $("#overview-pane").click()
  }


  reset()

}])