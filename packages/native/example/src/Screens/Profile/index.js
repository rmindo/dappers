import React from 'react'
import SafeAreaView from 'react-native-safe-area-view'

/**
 * React Native Components
 */
import {
  Text,
  View
}
from 'react-native'

/**
 * Profile Screen
 */
 export default class Profile extends React.PureComponent {

  /**
   * Render
   */
  render() {
    const {text} = this.props
    return (
      <SafeAreaView>
        <View
          style={{
            padding: 20
          }}>
          <Text style={{fontSize: 30}}>Profile</Text>
          {text && (
            <View
              style={{
                marginTop: 40,
                alignItems: 'center'
              }}>
              <Text style={{fontSize: 25, fontWeight: '500', marginBottom: 20}}>Awesome!</Text>
              <Text style={{fontSize: 18, fontStyle: 'italic'}}>{text}</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    )
  }
}