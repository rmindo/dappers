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
    screen: null,
    persist: true,
    dispatch: null,
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
    else {
      return Object.assign(_default, {data: args[0]})
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
      else {
        return Object.assign(_default, {data: args[1], screen: args[0]})
      }
    }
    return Object.assign(_default, {screen: args[0]})
  }
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
     * Set new route
     */
    var prev = history[history.length-1]
    o.setRoute({
      ...prev,
      data: {
        ...context.data[prev.name],
        ...args.data
      }
    }, args)
    /**
     * Will be use in the "hardwareBackPress" event
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
      var prev = history[history.length-1]
      var route = {
        prev: prev.name,
        data: args.data,
        name: args.screen,
        index: history.length
      }
      /**
       * Preserve the route parameters to use it to populate back
       * to previous screen along with new data added from back function
       */
      context.data[route.name] = Object.assign(context.data[route.name] ?? {}, route.data)
      /**
       * Push new route
       */
      history.push(route)
      /**
       * Set new route
       */
      o.setRoute(route, args)
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
      if(context.ref[route.name]) {
        update(route.name, args.persist, context)
      }
      /**
       * Set new route
       */
      setState({route, history, persist: args.persist, dispatch: args.dispatch})
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