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
    var linkDependencies = ['$scope', '$element', '$attr'] //These are linktime dependencies
    if (typeof(linkFn) === "object" && linkFn.constructor == Array) { //Dependencies are given
      dependencies = linkFn
      linkFn = dependencies.pop() //last element is the function itself
      if (typeof(linkFn) !== "function")
        throw new Error("Passed invalid link function " + linkFn)
    }


    var directiveFn = function() {
      var dependencyMap = {} //Hold a map of name -> service
      var resolvedDeps = arguments
      _.each(dependencies, function(name, i) { dependencyMap[name] = resolvedDeps[i] }) //Build map

      return {
        templateUrl:'templates/' + elementName + '.html',
        restrict:'E',
        link: function($scope, $elem, $attr) {
          dependencyMap['$scope'] = $scope
          dependencyMap['$elem'] = $elem
          dependencyMap['$attr'] = $attr

          //finally call linkfn with resolved dependencies
          return linkFn.apply(this, _.map(dependencies, function(name) { return dependencyMap[name] }))          
        }
      }
    }

    //Build directive function with filtered dependencies
    var directiveArg = _.difference(dependencies, linkDependencies)
    directiveArg.push(directiveFn)

    return mod.directive(elementName, directiveArg)
  }


  return mod
}