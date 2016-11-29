bankjs.factory('account', ['storage', 'id', 'transaction', function(storage, id, transaction) {
  //Initialize accounts
  var accounts = storage.get('accounts')
  if (!accounts) {
    accounts = {id:0, map:{}}
    accounts.map[id(0,6)] = {id:id(0,6), name:'Bank'}
    storage.put('accounts', accounts)
  }

  function Account(name) {
    this.id = id(++accounts.id, 6)
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

  account.create = function(owner, balance) {
    //Create account
    var acc = new Account(owner)
    accounts.map[acc.id] = acc

    //Transfer initial balance from bank
    transaction.add(account.bank.id, acc.id, parseInt(balance*100)) 
  }

  account.all = function() { return _.values(accounts.map) }

  account.get = function(nr) { return accounts.map[id(nr, 6)] }

  account.bank = account.get(0) //The bank account always has the id 0




  return account
}])