import React from 'react'
import {
  View,
  Linking,
  BackHandler,
}
from 'react-native'

/**
 * Props dispatcher
 */
import dispatcher from './dispatcher'

/**
 * Context
 */
var context = {
  screens: null,
  properties: []
}


/**
 * Pass props to children components
 * @param {function} Child 
 */
export const derive = (Child) => {
  return React.memo((props) => {
    return <Child {...props} {...context.props}/>
  })
}

/**
 * Reduce children
 * @param {object} children 
 * @param {object} props 
 */
const reducer = (children, props) => children.reduce((items, item) => {
  var components = []

  if(typeof item.type == 'function') {

    var child = item.type(props)
    if(child) {
      var {type, children} = child.props

      switch(type) {
        /**
         * Screens
         */
        case 'screens':
          if(children) {
            items[type] = React.Children.toArray(children).reduce((screens, {props:{name, component}}) => {
              if(component) {
                screens[name] = {
                  ref: null,
                  data: null,
                  state: [],
                  component
                }
              }
              return screens
            }, {})
          }
        break
        /**
         * Navigation
         */
        case 'navigation':
          items[type] = child
        break
        /**
         * Other components
         */
        default:
          components.push(child)
      }
      items['components'] = components
    }
  }

  /**
   * Add to global context
   */
  if(context.screens == null) {
    if(items['screens']) {
      context.screens = items['screens'] 
    }
  }

  return items
}, {})



/**
 * Screen Navigator
 * @param {object} params
 */
export const Navigator = function({initial, children, dispatch}) {

  if(initial) {
    var initial = {
      data: {},
      name: initial,
    }
    context.default = {route: initial, history: [initial]}

    /**
     * Start rendering components
     */
    if(children) {
      var props = dispatcher(dispatch, context)
      var {screens, navigation, components} = reducer(React.Children.toArray(children), props)

      if(screens) {
        /**
         * Execute once before the initial route
         */
        if(props.navigate.history.length == 1) {
          /**
          * Execute event before the initial screen mounted
          */
          props.events.emit('start')
          /**
          * Add native listener
          */
          Linking.addEventListener('url', props.navigate.link)
          BackHandler.addEventListener('hardwareBackPress', props.navigate.back)
        }

        /**
         * Render components
         */
        return [
          ((name) => {
            var child = null
            var screen = context.screens[name]
            var Component = screen.component
            if(Component) {
              child = (
                <Component
                  ref={(ref) => {
                    if(ref) {
                      screen.ref = ref
                      /**
                       * Similar to "getDerivedStateFromProps" but not static
                       */
                      if(ref.derive) {
                        screen.state.push(ref.derive(props, ref.state))
                      }
                    }
                  }}
                  {...props}
                />
              )
            }
            return React.createElement(View, {flex: 1, key: name.toLowerCase()}, child)
          })
          (props.route.name),
          /**
           * Navigation
           */
          ((child) => {
            if(child) {
              var names = child.props.children.map(i => i.props.name)

              if(names.includes(props.route.name)) {
                return React.cloneElement(child, {...child.props, key: 'navigation'}, child.props.children)
              }
            }
          })
          (navigation),
          /**
           * Other components
           */
          ...((items) => items.map((child, key) => {
            return (
              React.cloneElement(child, {...child.props, key}, child.props.children)
            )
          }))
          (components)
        ]
      }
    }
  }
  throw Error('No initial route name defined')
}