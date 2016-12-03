                        
bankjs.element('newAccount', ['$scope', 'account', function($scope, account) {
  //Function to reset form data
  $scope.reset = function() {
    $scope.account = {balance:0, owner:undefined, password1:undefined, password2:undefined}
    $('#new-owner').focus()
  }

  //Actually creates the account
  $scope.createAccount = function() {
    account.create($scope.account.owner, $scope.account.password1, $scope.account.balance || 0)
    $scope.reset()
  }

  //Only empty names are invalid
  $scope.nameLength = function() {
    return $scope.account.owner === undefined || $scope.account.owner.replace(/ /g, '') !== ""
  }

  $scope.validName = function() {
    return $scope.account.owner && $scope.nameLength()
  }


  $scope.passwordsMatch = function() {
    return $scope.account.password2 === undefined || $scope.account.password1 === $scope.account.password2
  }

  $scope.passwordLength = function() {
    return $scope.account.password1 === undefined || $scope.account.password1.length >= 4
  }

  $scope.validPassword = function() {
    return $scope.account.password1 && $scope.account.password2 && $scope.passwordsMatch() && $scope.passwordLength()
  }

  $scope.validBalance = function() {
    return $scope.account.balance >= 0
  }

  /** Enables/Disables the submit button
   */
  $scope.formValid = function() {
    return $scope.validPassword() && $scope.validName() && $scope.validBalance()
  }


  $scope.reset()
}])