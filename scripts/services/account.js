bankjs.factory('account', ['storage', 'id', 'transaction', function(storage, id, transaction) {
  //Initialize accounts
  var accounts = storage.get('accounts')
  if (!accounts) {
    accounts = {id:1, map:{}}
    accounts.map[id(0,6)] = {id:id(0,6), name:'Bank'}
    storage.put('accounts', accounts)
  }

  function Account(id, name) {
    this.id = id
    this.name = name
  }

  Account.prototype.balance = function() {
    return transaction.balance(this.id)
  }


  //Set prototype for each entry
  _.each(accounts.map, function(entry) {
    entry.__proto__ = Account.prototype
  })


  var account = {}


  //TODO implement this
  account.create = function() {}

  account.all = function() { return _.values(accounts.map) }




  return account
}])