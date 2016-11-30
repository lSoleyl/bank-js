                        
bankjs.element('newAccount', ['$scope', 'account', function($scope, account) {
  //Function to reset form data
  $scope.reset = function() {
    $scope.account = {balance:0, owner:""}
    $('#new-owner').focus()
  }

  $scope.createAccount = function() {
    account.create($scope.account.owner, $scope.account.balance)
    $scope.reset()
  }


  $scope.reset()
}])