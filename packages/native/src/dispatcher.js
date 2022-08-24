/**
 * Properties
 */
 import properties from './properties'

 /**
  * Merge properties from context and new properties
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
  * 
  */
 export default (dispatch, context) => {
   var props = merge(context, properties(context))
 
   /**
    * Dispatch props
    */
   if(dispatch) {
     if(typeof dispatch == 'function') {
       props = Object.assign(props, dispatch(props))
     }
     else {
       props = Object.assign(props, dispatch)
     }
   }
   
   /**
    * Execute event before the initial screen mounted
    */
   if(props.navigate.history.length == 1) {
     props.events.emit('start')
   }
 
   return context.props = props
 }