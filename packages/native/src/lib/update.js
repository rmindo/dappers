
/**
* Update state when mounted
* @param {string} name
* @param {object} context
* @param {object} args
* @returns {void}
*/
export default (name, context, args) => {

  /**
   * Re-update after the state of a component is updated with the most recent state
   */
  setTimeout(() => {
    var {ref, state} = context.screens[name]
    
    state = state.filter(i => i)
    if(ref) {
      var last = state[state.length-1]
      if(last) {
        /**
         * If the component have to set a state
         */
        if(args.addState) {
          if(typeof args.addState == 'function') {
            last = args.addState(last)
          }
          else {
            last = args.addState
          }
          ref.setState(last)
        }
        else {
          /**
           * If the component needs to persist the state
           * then set the last group of state
           */
          if(args.persistState) {
            ref.setState(last)
          }
        }
      }
    }
  })
  /**
   * Push the current state to the list of state
   */
  var {ref, state} = context.screens[name]
  if(ref) {
    state.push(ref.state)
  }
}