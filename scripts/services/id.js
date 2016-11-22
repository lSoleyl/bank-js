/** This service provides a function to generate string ids with specified length
 */
bankjs.factory('id', function() {
  return function(id, digits) {
    digits = digits || 6

    var result = '' + id
    while(result.length < digits) {
      result = '0' + result
    }
    return result
  }
})