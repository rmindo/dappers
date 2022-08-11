import React from 'react'
import {Navigator} from '@dappers/native'
import {SafeAreaProvider} from 'react-native-safe-area-context'

/**
 * Models
 */
import Models from '@Models'

/**
 * Aggregated Screens
 */
import Screens from '@Screens'

/**
 * Components
 */
import Modal from '@Components/Modal'
import Navigation from '@Components/Navigation'

/**
 * Main App
 */
export default () => (
  <SafeAreaProvider>
    <Navigator initial={'Loader'} dispatch={Models}>
      <Screens/>
      <Navigation/>
      <Modal/>
    </Navigator>
  </SafeAreaProvider>
)