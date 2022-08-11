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
  ref: {},
  data: {},
  state: {},
  props: {},
  options: {}
}


/**
 * Pass props to children components
 * @param {*} Child 
 */
export const derive = (Child) => {
  return React.memo((props) => {
    return <Child {...context.props} {...props}/>
  })
}

/**
 * Reduce children
 * @param {object} props 
 * @param {object} children 
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
                screens[name] = component
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
      index: 0,
      name: initial,
    }
    context.default = {route: initial, history: [initial]}

    /**
     * Start rendering components
     */
    if(children) {
      var {props} = dispatcher(dispatch, context)
      var {screens, navigation, components} = reducer(React.Children.toArray(children), props)

      /**
       * Set state holder empty at once
       */
      if(props.navigate.history.length == 1) {
        if(screens) {
          Object.keys(screens).forEach(name => context.state[name] = [])
        }

        Linking.addEventListener('url', props.navigate.link)
        BackHandler.addEventListener('hardwareBackPress', props.navigate.back)
      }

      /**
       * Render components
       */
      return [
        ((name) => {
          if(screens) {
            var Component = screens[name]

            /**
             * Reset route parameters if previous route using it,
             * to ensure only current route using it.
             */
            if(Object.keys(context.data).length > 0) {
              context.data = {}
            }

            if(Component) {
              var children = (
                <Component
                  ref={(ref) => {
                    if(ref) {
                      context.ref[name] = ref
                    }
                  }}
                  {...props}
                />
              )
              return React.createElement(View, {flex: 1, key: name.toLowerCase()}, children)
            }
          }
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
        ...((items) => items.map((child, key) => (
          React.cloneElement(child, {...child.props, key}, child.props.children)
        )))
        (components)
      ]
    }
  }
  throw Error('No initial route name defined')
}