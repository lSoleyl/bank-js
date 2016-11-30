/** This module interacts with the browser's local storage, where the content is saved.
 *  It implements a simple key-value storage like redis
 */ 
bankjs.factory('storage', ['config', function(config) {
  
  //The class representing the returned storage service
  class Storage {
    //Construct and load storage object
    constructor(storageKey) {
      this.storage_key = storageKey
      this.data = {}
      this.size = 0
      this.load()
    }

    //Retrieve a stored value
    get(key) {
      return this.data[key]
    }

    //Store a value
    put(key, value) {
      this.data[key] = value
    }

    //Save the data
    save() {
      const rawData = JSON.stringify(this.data)
      localStorage.setItem(this.storage_key, rawData)
      this.size = rawData.length
    }

    //Load the data from the local storage
    load() {
      const rawData = localStorage.getItem(this.storage_key)
      this.size = rawData ? rawData.length : 0
      this.data = JSON.parse(rawData || "{}")
    }

    //Clear the whole storage
    clear() {
      this.data = {}
      this.size = 0
      localStorage.removeItem(this.storage_key)
    }
  }

  return new Storage(config.backend.storage_key)
}])