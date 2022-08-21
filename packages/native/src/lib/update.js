
/**
* Update state when mounted
* @param {string} name
* @param {object} args
* @param {object} context
* @returns {void}
*/
export default (name, persist, context) => {
  /**
   * Update the state with the most recent state
   */
  setTimeout(() => {
    var {ref, state} = context.screens[name]
    if(ref) {
      var last = state[0]
      if(persist) {
        last = state[state.length-1]
      }
      ref.setState(last)
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