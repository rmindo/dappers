
import React from 'react'

/**
 * React Native Components
 */
 import {
  Text,
  View,
  TouchableOpacity
}
from 'react-native'

/**
 * 
 */
export default (({route, window, navigate}) => {
  var tabs = [
    {name: 'Home', 'icon': 'home'},
    {name: 'Profile', 'icon': 'user'},
  ]
  return (
    <View
      type={'navigation'}
      style={{
        borderTopWidth: 1,
        paddingVertical: 20,
        alignItems: 'center',
        flexDirection: 'row',
        borderTopColor: '#ddd',
        backgroundColor: '#fff',
        justifyContent: 'space-between'
      }}>
      {tabs.map(({name}, key) => {
        var activeColor = {color: name === route.name ? 'red' : '#555'}
        return (
          <TouchableOpacity
            key={key}
            name={name}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: window.width/tabs.length,
            }}
            onPress={() => {
              navigate.next(name)
            }}>
            <Text style={[activeColor, {fontSize: 18, fontWeight: '500'}]}>{name}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
})