/** AngularJS extensions
 */
angular.__module__ = angular.module
angular.module = function() {
  var mod = angular.__module__.apply(angular, arguments) //Get original module
  //Patch all extensions into the returned module object
  var $injector = angular.injector()

  /** Element directive, which defines a new element and expects a template at
   *  templates/<elementName>.html
   */
  mod.element = function(elementName, linkFn) {
    var dependencies = [] //Directive dependencies
    var linkDependencyList = ['$scope', '$element', '$attr', '$controller'] //These are the arguments for the link function
    if (typeof(linkFn) === "object" && linkFn.constructor === Array) { //Dependencies are given as array
      dependencies = linkFn
      linkFn = dependencies.pop() //last element is the function itself
      if (typeof(linkFn) !== "function")
        throw new Error("Passed invalid link function " + linkFn)
    } else if (typeof(linkFn) === "function" && linkFn.$inject) { //Function has set inject property
      dependencies = linkFn.$inject
    }

    //Split dependencies
    var directiveDependencies = _.difference(dependencies, linkDependencyList) //Dependencies for directive
    var linkDependencies = _.difference(dependencies, directiveDependencies)   //Dependencies for link


    //This function retruns the directive's definition object
    var directiveFn = function() {
      var dependencyMap = {} //Hold a map of name -> service
      var resolvedDeps = arguments
      _.each(directiveDependencies, function(name, i) { dependencyMap[name] = resolvedDeps[i] }) //Build map

      //The function which calls the actual linkFn and passes the resolved dependencies to it
      var linkFnCaller = function() {
        var resolvedDeps = arguments
        _.each(linkDependencyList, function(name, i) { dependencyMap[name] = resolvedDeps[i] }) //Complete map

        //Finally call the passed element linkfn with resolved dependencies
        return linkFn.apply(this, _.map(dependencies, function(name) { return dependencyMap[name] }))
      }

      return {
        templateUrl:'templates/' + elementName + '.html',
        restrict:'E',
        link: linkFnCaller,
        scope:true
      }
    }

    //Set directive dependencies via $inject
    directiveFn.$inject = directiveDependencies
    return mod.directive(elementName, directiveFn)
  }


  return mod
}