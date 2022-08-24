/**
 * Properties
 */
 import properties from './properties'

 /**
  * Get dispatched states
  * @returns 
  */
 const mergeProps = ({route, properties}, props) => {
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
  * 
  */
 export default (dispatch, context) => {
   var props = properties(context)
 
   /**
    * Dispatch props
    */
   if(dispatch) {
     if(typeof dispatch == 'function') {
       context.properties.push({payload: dispatch(props)})
     }
     else {
       context.properties.push({payload: dispatch})
     }
   }
   /**
    * Execute event before the initial screen mounted
    */
   if(props.navigate.history.length == 1) {
     props.events.emit('initial')
   }
 
   return context.props = mergeProps(context, props)
 }