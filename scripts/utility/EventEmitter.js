/** This script defines an event emitter class
 */

//Define in own anonymous function to keep namespace clean
var EventEmitter = function() {
  var EventEmitter = function() {
    this.listeners = {};
  }

  function registerHandler(emitter, event, handlerObject) {
    if (!this.listeners[event]) 
      this.listeners[event] = [] //Create empty listener list if missing

    this.listeners[event].push(handlerObject)
  }

  /** Register to an event
   */
  EventEmitter.prototype.on = function(event, handler) {
    registerHandler(this, event, {handler:handler, once:false})
    return this
  }

  /** Register to an event, but execute handler only once
   */
  EventEmitter.prototype.once = function(event, handler) {
    registerHandler(this, event, {handler:handler, once:true})
  }

  /** Actually fires the event
   */
  EventEmitter.prototype.emit = function(event) {
    if (!event)
      throw new Error("Missing event for EventEmitter.emit(event)")

    if (this.listeners[event]) { //are there listeners for this event?
      var handlers = _.map(this.listeners[event], 'handler') //Get all handlers
      _.remove(this.listeners[event], function(entry) { return entry.once }) //Remove once handlers

      //Prepare arguments (first argument is event)
      var args = _.tail(arguments)

      //Call each handler
      _.each(handlers, function(handler) {
        handler.apply(null/*bound this?*/, args)
      })
    }
  }

  /** Remove all listeners for the given event, or all listeners
   */
  EventEmitter.prototype.removeAllListeners = function(event) {
    if (!event) {
      this.listeners = {}
    } else {
      delete this.listeners[event]
    }
  }

  return EventEmitter;
}();
