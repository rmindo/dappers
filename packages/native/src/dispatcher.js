/**
 * Properties
 */
import properties from './properties'

/**
 * merge dispatched states
 * @returns 
 */
const merge = ({route, properties}, props) => {
  var data = {}

  for(var {scope, payload} of properties) {
    if(scope) {

      if(typeof scope == 'string') {
        throw new Error(
          'Expected scope to be of type `array` but received a `string`.'
        )
      }

      if(scope.includes(route.name)) {
        data = Object.assign(data, payload)
      }
    }
    else {
      data = Object.assign(data, payload)
    }
  }
  return Object.assign(data, props)
}


/**
 * Set properties
 */
export default (dispatch, context) => {
  var props = properties(context)
  /**
   * Dispatch at once before the initial screen
   */
  if(props.navigate.history.length == 1) {
    if(dispatch) {
      if(typeof dispatch == 'function') {
        context.properties.push({payload: dispatch(props)})
      }
      else {
        context.properties.push({payload: dispatch})
      }
    }
  }
  return context.props = merge(context, props)
}