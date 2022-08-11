/**
 * React Native
 */
import {AppRegistry} from 'react-native'
/**
 * App
 */
import App from './src/App'
import AppName from './app.json'

/**
 * Register Component
 */
AppRegistry.registerComponent(AppName.name, () => App)