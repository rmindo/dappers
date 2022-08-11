# @dappers/native

A customizable react native framework with state or object aggregator and dispatcher that makes it easy to access all aggregated data from all components including children.

## Installation
```
npm install @dappers/native
```

## Documentation
[https://github.com/rmindo/dappers](https://github.com/rmindo/dappers)

## Example
[https://github.com/rmindo/dappers/tree/main/packages/native/example](https://github.com/rmindo/dappers/tree/main/packages/native/example)

##### Create Navigator
```js
// ./src/App.js
import React from 'react'
import {Navigator} from '@dappers/native'
import {SafeAreaProvider} from 'react-native-safe-area-context'

/**
* Aggregated Screens
*/
import Screens from '@Screens'

/**
* Components
*/
import Modals from '@Components/Modals'
import Navigation from '@Components/Navigation'

/**
* Main App
*/
export default () => (
    <SafeAreaProvider>
        <Navigator initial={'Loader'} dispatch={{greetings: 'Hello World'}}>
            <Screens/>
            <Navigation/>
            <Modals/>
        </Navigator>
    </SafeAreaProvider>
)
```


##### Create Screens
```js
// ./src/Screens/index.js
import React from 'react'
import {View} from 'react-native'
/**
* Container
*/
import Home from '@Screens/Home'
import Loader from '@Screens/Loader'
import Profile from '@Screens/Profile'

const screens = {
    Home,
    Loader,
    Profile,
}
export default (props) => {
    return (
        <View type={'screens'}>
            {Object.keys(screens).map((name, key) => (
                <View key={key} name={name} component={screens[name]}/>
            ))}
        </View>
    )
}
```


##### Create Navigation
```js
// ./src/Components/Navigation
import React from 'react'
import {
    Text,
    View,
    TouchableOpacity
}
from 'react-native'

/**
* Tabs
*/
export default (({route, navigate}) => {
    var tabs = [
        {name: 'Home', 'icon': 'home'},
        {name: 'Account', 'icon': 'account'},
    ]
    return (
        <View type={'navigation'}>
            {tabs.map(({name, icon}, key) => {
                var activeColor = {color: name === route.name ? 'red' : '#555'}
                return (
                    <TouchableOpacity
                        key={key}
                        name={name}
                        onPress={() => {
                            navigate.next(name)
                        }}>
                        <Text>{name}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
})
```



## Change Log

[Semantic Versioning](http://semver.org/)

## License

MIT
