/**
 * Properties
 */
import properties from './properties'

/**
 * 
 */
export default (dispatch, context) => {
  var props = properties(context)
  /**
   * Dispatch at once before the initial screen
   */
  if(props.navigate.history.length == 1) {
    if(dispatch) {
      if(typeof dispatch == 'function') {
        context.props = dispatch(props)
      }
      else {
        context.props = dispatch
      }
    }
  }
  return {props: Object.assign(context.props, props)}
}