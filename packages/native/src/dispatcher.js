/**
 * Properties
 */
import properties from './properties'

/**
* Merge properties from context and new properties
* @returns 
*/
const mergeFromContext = ({properties}, props) => {
  var data = {}

  for(var {scope, payload} of properties) {
    if(scope) {
      if(typeof scope == 'string') {
        throw new Error(
          'Expected scope to be of type `array` but received a `string`.'
        )
      }
      if(scope.includes(props.route.name)) {
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
* 
*/
export default (dispatch, context) => {
  var {state, props} = properties(context)

  /**
   * Dispatch data into props
   * @param {object} data 
   */
  props.store = {
    dispatch: (data) => {
      if(typeof data == 'function') {
        data = data(context.props)
      }
      if(data) {
        if(data?.payload) {
          context.properties.push(data)
        }
        else {
          context.properties.push({payload: data})
        }
      }
    }
  }

  /**
   * Add to context props
   */
  if(state.dispatch) {
    props.store.dispatch(state.dispatch)
  }

  /**
  * Dispatch props
  */
  var props = mergeFromContext(context, props)
  if(dispatch) {
    if(typeof dispatch == 'function') {
      props = Object.assign(props, dispatch(props))
    }
    else {
      props = Object.assign(props, dispatch)
    }
  }

  return context.props = props
}