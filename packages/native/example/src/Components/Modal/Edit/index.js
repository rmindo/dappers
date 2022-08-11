import React from 'react'
import {derive} from '@dappers/native'


/**
 * React Native Components
 */
 import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
}
from 'react-native'

/**
 * Create Post
 */
export default derive(({window:{height}, route:{data}, navigate}) => {
  var [text, setText] = React.useState(data.text)
  return (
    <View
      style={{
        height,
        paddingVertical: 30,
        paddingHorizontal: 20,
      }}>
      <View>
        <Text style={{fontSize: 18, fontWeight: '500', marginBottom: 15}}>Edit</Text>
        <Text style={{fontSize: 15, marginBottom: 15}}>Go to Profile after dispatching to see the result.</Text>
        <TextInput
          value={text}
          style={{
            fontSize: 15,
            minHeight: 120,
            paddingTop: 15,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: '#ddd',
            paddingHorizontal: 15,
            backgroundColor: '#f9f9f9'
          }}
          multiline
          onChangeText={(v) => setText(v)}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          navigate.back({dispatch: {text}})
        }}
        style={{
          marginTop: 20,
          borderRadius: 5,
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: '#5002c9'
        }}>
        <Text style={{color: 'white', fontWeight: '700', textAlign: 'center'}}>Dispatch</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigate.back()
        }}
        style={{
          marginTop: 10,
          borderRadius: 5,
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderColor: '#ddd',
          borderWidth: 1,
        }}>
        <Text style={{fontWeight: '700', textAlign: 'center'}}>Cancel</Text>
      </TouchableOpacity>
    </View>
  )
})