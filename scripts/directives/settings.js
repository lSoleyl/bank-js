/** This directive defines an element, which synchronizes $rootScope.settings with the current application settings
 */
bankjs.element('settings', ['$rootScope', '$scope', 'storage', function($rootScope, $scope, storage) {
  $rootScope.settings = storage.get("settings") || {}

  $rootScope.$watch('settings', function(oldValue, newValue) {
    if (newValue !== undefined && oldValue !== undefined && JSON.stringify(oldValue) != JSON.stringify(newValue)) {
      storage.put("settings", newValue)
      storage.save() //Save on change of settings
    }
  })


  //Expose the storage's size to the settings page
  $scope.storageSize = function() {
    return storage.size
  }

  //TODO add confirm dialog and some feedback whether operation was successful
  $scope.clearStorage = function() {
    storage.clear()
  }
}])