# Dappers

A customizable react framework with state or object aggregator and dispatcher that makes it easy to access all aggregated data from all components including children.

## Features
* Flexible and easy to use.
* Customizable components and layout.
* Dispatch new data and update real-time.
* Access the aggregated state and object globally.
* More options to navigate, populate and dispatch data simultaneously.


## Build it with
* [React Native](https://github.com/rmindo/dappers/tree/main/packages/native)


# Documentation
Below are the implementation and examples of all features

## Properties
Available properties from components to use in the app.

#### route
Return the current route with data populated.
```js
this.props.route
{
  name: 'Home',
  prev: 'Loader',
  index: 1,
  data: {
      greetings: 'Welcome Home'
  }
}
```

#### dispatch
A straightforward state dispatcher or object aggregator.
```js
// Dispatch with object
this.props.dispatch({greetings: 'Hello World'})

// Dispatch with callback
this.props.dispatch((props) => {
  return {greetings: 'Hello World'}
})
```

#### navigate
Navigator with dispatcher and route history.
* ##### navigate.history
    Return the route history with array.
    ```js
    this.props.navigate.history
    [
      {"data": {}, "index": 0, "name": "Loader"},
      {"data": {message: 'Welcome Home'}, "index": 1, prev: "Loader", name": "Home"},
    ]
    ```

* ##### navigate.next
    Navigate to the next screen
    ```js
    this.props.navigate.next('Profile', {
      // Available to the next screen (Profile)
      data: {
        message: 'Welcome to my profile'
      },
      // Available (real-time) to all components globally
      dispatch: {
        greetings: 'Hello World'
      },
      // Persist, where a state of a component has to be persisted with the last state made previously on a specific screen.
      persist: false // default is true
    })
    
    // Navigate without second parameter
    this.props.navigate.next('Profile')
    
    // Navigate without dispatch, persist, and data parameters
    this.props.navigate.next('Profile', {message: 'Welcome to my profile'})
    
    // Navigate using object as first parameter
    this.props.navigate.next({screen: 'Profile', data: {message: 'Welcome to my profile'}})
    ```
    
    ```js
    // Access the data
    this.props.route.data // {message: 'Welcome to my profile'}
    ```
    
* ##### navigate.back
    Navigate back to the previous screen with the parameter (optional).
    > When triggered, the last item of the route history will be removed.

    ```js
    this.props.navigate.back({
      // Available to the previous screen with merged data populated using navigate.next()
      data: {
        message: 'I\'m back'
      },
      // Available (real-time) to all components globally
      dispatch: {
        greetings: 'Hello Universe'
      },
      persist: false
    })
    
    // Input arbitrary data without dispatch, persist, and data parameters
    this.props.navigate.back({message: 'I\'m back'})
    ``` 
    ```js
    // Access the data
    this.props.route.data // {message: 'I\'m back'}
    ```
    
* ##### navigate.reload
    Reload the current screen with data as a first parameter.
    > When reloading the current screen, a new route will be added to the route history making it useful for the use case of layered components such as multiple modal in one screen that needs to be closed when the [hardwareBackPress](https://reactnative.dev/docs/backhandler) event is triggered.

    ```js
    // Trigger the modal using reload
    this.props.navigate.reload({modal: 'Edit', open: true})
    
    // Reload with dispatch
    this.props.navigate.reload({data: {modal: 'nameList', open: true}, dispatch: {}})
    ```
    ```js
    // Access the data
    this.props.route.data // {modal: 'Edit', open: true}
    ```
    
* ##### navigate.connect
    Connect and redirect the incoming URL (deep link) to the local route and return the parsed URL.
    ```js
    // Deep link URL e.g. myapp://profile?name=john
    this.props.navigate.connect({
      // The pathname (key) from the incoming URL and the screen name (value) or component
      route: {profile: 'Profile'},
      // Available (real-time) to all components globally
      dispatch: {greetings: 'Hello John'}
    })
    // Return
    {query: {name: "john"}, schema: "myapp:", pathname: "profile"}

    
    // Using callback with parsed URL as argument
    this.props.navigate.connect((parsedURL) => {
      return {
        route: {profile: 'Profile'},
        dispatch: {
          // Dispatch to all components globally
          incomingData: parsedURL.query
        }
      }
    })
    ```
* ##### navigate.getIncomingURL
    Get the incoming URL (deep link) and return the parsed URL.
    ```js
    // Note: Only works when triggered by a deep link and launching the app.
    await this.props.navigate.getIncomingURL()
    // Return
    {query: {name: "john"}, schema: "myapp:", pathname: "profile"}
    ```

#### events
Basic event listener and emitter.
* ##### events.on
    Add custom event listener
    ```js
    // Add event listener to the list
    events.on('MyEvent', () => {
    // Code here
    })
    ```

* ##### events.once
    Add event listener and remove the after executing once
    ##### Predefined Events

    1. **componentMounted**
        Since dappers mount and unmounts the component every time switching a screen to update the properties of a component, this event is useful if you want to execute the code once the component is mounted for the first time.

    ```js
    // Add event listener to the list
    events.once('MyEventOnce', () => {
        // Execute code once
    })
    
    // Predefined event
    events.once('componentMounted', () => {
        // Execute code once
    })
    ```

* ##### events.emit
    Trigger the event that is recently added to the list.
    ```js
    events.emit('MyEvent')
    ```

* ##### events.remove
    Simply remove the event from the list.
    ```js
    events.remove('MyEvent')
    ```


## Accessing properties
Access the properties from a stateless component
```js
import {derive} from '@dappers/native'

export default derive((props) => {
  return (
    <View>
      <Text>{props.route.data.message}</Text>
    </View>
  )
))
```


## Components
#### Navigator
Navigator is the context provider and has two properties, initial and dispatch.
1. **initial** - Initial screen to display (required)
2. **dispatch** - The dispatch only occurs once before the initial route and it is dispatched globally. It can hold an initial state or constant object or use to dispatch a business logic.
    
```js
<Navigator initial={'Loader'} dispatch={{greetings: 'Hello World'}}>
    <Screens/>
    <Navigation/>
    <Modals/>
</Navigator>
```

#### Screens
Screens used the native view component as a parent with a property of type as an identifier and the children with two required properties, name and component.
```js
<View type={'screens'}>
    <View name={'Home'} component={Home}/>
</View>
```

#### Navigation
Tab is customizable with one required property of name and parent with type navigation.
```js
<View type={'navigation'}>
    <TouchableOpacity name={'Home'} onPress={() => {}}>
        <Text>Home</Text>
    </TouchableOpacity>
</View>
```


## License

MIT
