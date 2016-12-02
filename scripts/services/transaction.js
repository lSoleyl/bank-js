/** This service holds the list of all transactions
 */ 
bankjs.factory('transaction', ['storage', 'id', function(storage, id) {
  var transactions = storage.get('transactions')
  if (!transactions) {
    transactions = {id:0, list:[]}
    storage.put('transactions', transactions)
  }

  //Load date strings into date objects (necessary for date formatter)
  _.each(transactions.list, function(transaction) { transaction.date = new Date(transaction.date) })

  //Create service object
  var transaction = new EventEmitter()

  transaction.add = function(fromID, toID, amountCt, description) {
    if (fromID == toID)
      return;

    var tid = ++transactions.id
    transactions.list.push({
      'id':id(tid, 10),
      'from':fromID,
      'to':toID,
      'amount':amountCt,
      'description':description,
      'date':new Date()
    })

    storage.save() //Save each change

    this.emit('change') //Notify listeners
  }

  /** returns the balance for a given acount in cent
   */
  transaction.balance = function(accountID) {
    var balance = 0

    _.each(transactions.list, function(entry) {
      if (entry.from == accountID) 
        balance -= entry.amount
      else if (entry.to == accountID)
        balance += entry.amount
    })

    return balance
  }

  transaction.all = function() {
    return transactions.list
  }


  return transaction
}])