
/**
* Update state when mounted
* @param {string} name
* @param {object} args
* @param {object} context
* @returns {void}
*/
export default (name, persist, context) => {
  var state = context.state[name]
  /**
   * Update the state with the most recent state
   */
  setTimeout(() => {
    var last = state[0]
    if(persist) {
      last = state[state.length-1]
    }
    context.ref[name].setState(last)
  })
  /**
   * Push the current state to the list of state
   * of a certain component
   */
  context.state[name].push(context.ref[name].state)
}