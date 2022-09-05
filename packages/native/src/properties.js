import React from 'react'


/**
 * Navigator
 */
import events from './lib/events'
import navigator from './lib/navigator'


/**
 * Properties
 * @param {object} context Necessary data to help the state
 * @returns {object}
 */
export default (context) => {
  var [state, setState] = React.useState(context.default)

  /**
   * Current route
   */
  context.route = state.route

  return {
    state,
    props: {
      /**
       * Route
       */
      route: Object.seal(state.route),
      /**
       * Event Listener
       */
      events: Object.seal(events([state, setState], context)),
      /**
       * Navigator
       */
      navigate: Object.seal(navigator([state, setState], context)),
    }
  }
}