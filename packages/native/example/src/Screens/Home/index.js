import React from 'react'
import SafeAreaView from 'react-native-safe-area-view'

/**
 * React Native Components
 */
import {
  Text,
  View,
  TouchableOpacity,
}
from 'react-native'

/**
 * Home Screen
 */
 export default class Home extends React.PureComponent {

  state = {
    count: 0
  }


  /**
   * Render
   */
  render() {
    const {count} = this.state
    const {text, greetings, navigate} = this.props

    const _default = 'Edit and dispatch globally'
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <View
          style={{
            marginBottom: 20,
            alignItems: 'center'
          }}>
          <Text style={{fontSize: 30}}>{greetings}</Text>
          <Text>Check the app to see the dappers features.</Text>
        </View>

        <View
          style={{
            alignItems: 'center'
          }}>
          <TouchableOpacity
            onPress={() => {
              navigate.reload({
                data: {
                  open: true,
                  name: 'Edit',
                  text: text ?? _default
                }
              })
            }}
            style={{
              marginTop: 20,
              borderWidth: 1,
              borderRadius: 5,
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}>
            <Text>{text ?? _default}</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            alignItems: 'center'
          }}>
          <TouchableOpacity
            onPress={() => {
              this.setState({count: count+1})
            }}
            style={{
              width: 'auto',
              marginTop: 20,
              borderWidth: 1,
              borderRadius: 5,
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}>
            <Text>Count {count}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}