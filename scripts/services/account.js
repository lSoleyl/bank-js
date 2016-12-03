bankjs.factory('account', ['storage', 'id', 'transaction', function(storage, id, transaction) {
  //Initialize accounts
  var accounts = storage.get('accounts')
  if (!accounts) {
    accounts = {id:0, map:{}}
    accounts.map[id(0,6)] = {id:id(0,6), name:'Bank'}
    storage.put('accounts', accounts)
  }

  //TODO add passwordhash
  function Account(name, password) {
    this.id = id(++accounts.id, 6)
    this.name = name
    this.password = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(password)) //Store hashed password
  }

  Account.prototype.balance = function() {
    return transaction.balance(this.id)
  }


  //Set prototype for each entry
  _.each(accounts.map, function(entry) {
    entry.__proto__ = Account.prototype
  })


  var account = {}

  account.get = function(nr) { return accounts.map[id(nr, 6)] }

  account.bank = account.get(0) //The bank account always has the id 0

  account.create = function(owner, password, balance) {
    //Create account
    var acc = new Account(owner, password)
    accounts.map[acc.id] = acc

    //Transfer initial balance from bank
    transaction.add(account.bank.id, acc.id, parseInt(parseFloat(balance)*100), "Account created") 
  }

  //Return all accounts, if filtered is true, then the system account will not be returned
  account.all = function(filtered) { 
    var accs = _.values(accounts.map)
    if (filtered)
      accs = _.filter(accs, function(acc) { return acc !== account.bank })

    return accs
  }

  

  




  return account
}])