import {
  Linking,
}
from 'react-native'

/**
 * 
 */
import update from './update'



/**
 * Set Default
 * @param  {mixed} args 
 * @returns {object}
 */
const _default = (...args) => {
  var _default = {
    data: {},
    skip: null,
    screen: null,
    history: true,
    dispatch: null,
    addState: null,
    persistState: true,
  }
  /**
   * 
   * Check if argument has keys from _default
   * @param {object} arg 
   * @returns {boolean}
   */
  var hasDefault = (arg) => {
    return (Object.keys(arg).filter(i => Object.keys(_default).includes(i)).length > 0)
  }

  /**
   * Object argument
   */
  if(typeof args[0] == 'object') {
    if(hasDefault(args[0])) {
      return Object.assign(_default, args[0])
    }
  }
  /**
   * String argument
   */
  else if(typeof args[0] == 'string') {
    if(args[1]) {
      if(hasDefault(args[1])) {
        return Object.assign(_default, args[1], {screen: args[0]})
      }
    }
    return Object.assign(_default, {screen: args[0]})
  }
  
  return _default
}


/**
 * Navigator
 * @param {array} [params] State getter and setter
 * @param {object} context Necessary data to help the state
 * @returns {object}
 */
export default ([state, setState], context) => {
  var o = {}

  /**
   * Route history
   */
  o.history = history = state.history


  /**
   * Reload screen
   * @param {object} data 
   */
  o.reload = (args = {}) => {
    o.next(state.route.name, args)
  }


  /**
   * Back to previous screen with parameters
   * @param {object} args
   */
   o.back = (args = {}) => {
    args = _default(args)

    history.pop()
    /**
     * Skip route
     */
    if(args.skip) {
      history = history.slice(0,-args.skip)
    }

    /**
     * Get previous route and screen
     */
    var prev = history[history.length-1]
    var screen = context.screens[prev.name]

    /**
     * Only merge if current screen is not equal to the previous screen
     */
    var data = {
      ...(prev.name !== state.route.name ? screen.data : {}),
      ...args.data
    }
    o.setRoute({...prev, data}, args)

    /**
     * Reset route data
     */
    if(prev.name == state.route.name) {
      screen.data = null
    }
    /**
     * Set true to use it in "hardwareBackPress" event
     */
    return true
  }


  /**
   * Navigate next screen
   * @param {string} name 
   * @param {object} args 
   */
  o.next = (...args) => {
    args = _default(...args)

    if(args.screen) {
      var prevRoute = history[history.length-1]
      var nextRoute = {
        data: args.data,
        name: args.screen,
        prev: prevRoute.name
      }
      var screen = context.screens[nextRoute.name]
      /**
       * Preserve the route parameters to use it to populate back
       * to previous screen along with new data added from back function
       */
      if(screen) {
        screen.data = nextRoute.data
        /**
         * Add new route
         */
        if(args.history) {
          history.push(nextRoute)
        }
        /**
         * Set new route
         */
        o.setRoute(nextRoute, args)
      }
      else {
        throw new Error(`No route "${route.name}" found.`)
      }
    }
  }


  /**
   * 
   * @param {object} route 
   * @param {object} args 
   */
  o.setRoute = (route, args) => {
    if(route.name) {
      /**
       * Update the state again with the latest state added to the list
       */
      update(route.name, context, args)
      /**
       * Set new route
       */
      setState({route, history, dispatch: args.dispatch})
    }
  }


  /**
   * Connect to a route
   * @param {object} arg
   * @returns {object}
   */
  o.connect = async (arg) => {
    if(arg) {
      var url = await o.getIncomingURL()
      
      if(typeof arg == 'function') {
        arg = arg(url)
      }
      if(url) {
        var screen = arg.route[url.pathname]
        if(screen) {
          o.next(screen, {data: url.query, dispatch: arg.dispatch})
        }
        return url
      }
    }
  }


  /**
   * Get incoming url and parse it
   * @returns {object}
   */
  o.getIncomingURL = async () => {
    var url = await Linking.getInitialURL()
    if(url) {
      var [path,query] = url.split('?')
      
      if(path) {
        var data = {}
        var [schema,pathname] = path.split('//')
  
        if(query) {
          for(let item of query.split('&')) {
            var param = item.split('=')
            if(param) {
              data[param[0]] = (param[1])
            }
          }
        }
  
        if(pathname) {
          return {query: data, schema, pathname, url}
        }
      }
    }
  }


  return o
}