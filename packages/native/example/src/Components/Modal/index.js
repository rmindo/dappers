import React from 'react'
import SafeAreaView from 'react-native-safe-area-view'
import {getStatusBarHeight} from 'react-native-status-bar-height'

/**
 * React Native Components
 */
 import {
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
}
from 'react-native'


/**
 * Components
 */
import Edit from '@Components/Modal/Edit'

/**
 * List of Modals
 */
const Modals = {
  Edit
}

/**
 * Export a certain modal
 */
export default (({navigate, route:{data}, window:{width, height}}) => {

  if(data.open) {
    var Content = Modals[data.name]

    if(Content) {
      return (
        <View
          style={{
            width,
            height,
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0.6)'
          }}>
          <Modal visible={true} transparent={true} animationType={'slide'}>
            <SafeAreaView>
              <TouchableOpacity
                onPress={() => navigate.back()}
                style={{
                  paddingTop: (data.offset ?? 0)+getStatusBarHeight()
                }}>
                <TouchableWithoutFeedback>
                  <View
                    style={{
                      borderRadius: 5,
                      backgroundColor: 'white'
                    }}>
                    <Content/>
                  </View>
                </TouchableWithoutFeedback>
              </TouchableOpacity>
            </SafeAreaView>
          </Modal>
        </View>
      )
    }
  }
  return null
})