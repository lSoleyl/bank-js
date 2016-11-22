/** This module interacts with the browser's local storage, where the content is saved.
 *  It implements a simple key-value storage like redis
 */ 
bankjs.factory('storage', ['config', function(config) {
  var data = {}

  //The service object to return
  var service = {}

  // Retrieve a stored value
  service.get = function(key) {
    return data[key]
  }
  //Store a value
  service.put = function(key, value) {
    data[key] = value
  }

  //Save the currently set data into the local storage
  service.save = function() {
    localStorage.setItem(config.backend.storage_key, JSON.stringify(data))
  }

  //Load the data from the local storage
  service.load = function() {
    data = JSON.parse(localStorage.getItem(config.backend.storage_key) || "{}")
  }

  //Load data upon service creation
  service.load()

  return service
}])