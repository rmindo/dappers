import React from 'react'
import {View} from 'react-native'

/**
 * Screens
 */
import Home from '@Screens/Home'
import Loader from '@Screens/Loader'
import Profile from '@Screens/Profile'


export default (props) => {
  return (
    <View type={'screens'}>
      <View name={'Home'} component={Home}/>
      <View name={'Loader'} component={Loader}/>
      <View name={'Profile'} component={Profile}/>
    </View>
  )
}