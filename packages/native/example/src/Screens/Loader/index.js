import React from 'react'

/**
 * React native components
 */
import {
  Text,
  View
}
from 'react-native'


/**
 * Loader Screen
 */
 export default class Loader extends React.PureComponent {

  /**
   * Redirect to profile if deep link otherwise go to home
   */
  componentDidMount = () => {
    var {navigate} = this.props

    navigate.connect((parsed) => {
      // Fake the loading
      setTimeout(() => {
        if(parsed) {
          return {route: {profile: 'Profile'}}
        }
        else {
          navigate.next({screen: 'Home', dispatch: {greetings: 'Welcome Home'}})
        }
      }, 800)
    })
  }

  /**
   * Render
   */
  render() {
    const {width, height} = this.props.window
    return (
      <View
        style={{
          width,
          height,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>Loading...</Text>
      </View>
    )
  }
}