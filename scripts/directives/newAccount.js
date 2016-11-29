                        
bankjs.element('newAccount', ['account', '$scope', function(account, $scope) {
  console.dir(arguments) //FIXME: if I swap account and $scope, then account becomes undefined...
  //Function to reset form data
  $scope.reset = function() {
    $scope.account = {balance:0, owner:""}
    $('#input-owner').focus()
  }

  $scope.createAccount = function() {
    account.create($scope.account.owner, $scope.account.balance)
    $scope.reset()
  }


  $scope.reset()
}])