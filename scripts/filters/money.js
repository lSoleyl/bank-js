bankjs.filter('money', function() {
  return function(moneyct) {
    return (moneyct / 100.0).toFixed(2) + ' €'
  }
})