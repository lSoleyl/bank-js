bankjs.element('transactionList', ['$scope', 'transaction', 'account', function($scope, transaction, account) {
  $scope.transactions = function() {
    if (!$scope.filter) 
      return transaction.all() 
    else
      return _.filter(transaction.all(), function(trans) { return trans.from == $scope.filter || trans.to == $scope.filter })
  }
  $scope.accounts = function() { return account.all() }

  $scope.filter = undefined
}])