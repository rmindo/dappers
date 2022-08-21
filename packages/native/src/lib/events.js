import update from './update'


/**
 * Callbacks
 */
var cbs = {}

/**
* Event Listener and Emitter
* @param {object} state
* @param {object} context
* @returns {object}
*/
export default ([state], context) => ({
  /**
   * Add event
   * @param {string} name 
   * @param {function} cb 
   */
  on: (name, cb) => {
    cbs[name] = {
      type: 'on',
      callback: cb
    }
  },
  /**
   * Trigger the event
   * @param {mixed} arg 
   */
  emit: (name) => {
    if(cbs[name]) {
      cbs[name].callback.apply()
      /**
       * Remove event for type once
       */
      if(cbs[name].type == 'once') {
        delete cbs[name]
      }
    }
  },
  /**
   * Add event that execute once
   * @param {string} name 
   * @param {function} cb
   */
  once: (name, cb) => {

    switch(name) {
      /**
       * Update state with previous state value at once
       */
      case 'componentMounted':
        var route = state.route
        /**
         * Execute only once if ref is added already to the screen, see context.screens
         */
        if(context.screens[route.name].ref) {
          return update(route.name, state.persist, context)
        }
        cb()
      break
      /**
       * Add custom event
       */
      default:
        cbs[name] = {
          type: 'once',
          callback: cb
        }
    }
  },
  remove: (name) => delete cbs[name]
})