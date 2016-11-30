/** bytes filter from https://gist.github.com/thomseddon/3511330
 */
bankjs.filter('bytes', function() {
  return function(bytes, precision) {
    if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) 
      return '-';
    if (typeof precision === 'undefined') 
      precision = 1;

    if (bytes == 0) //Special case (log(0) == inf)
      return '0 bytes'

    var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB']
    var number = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) +  ' ' + units[number];
  }
});