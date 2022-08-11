import {Dimensions} from 'react-native'

/**
 * Business logic
 */
export default () => {
  return {
    calculator: {
      add: () => {

      }
    },
    /**
     * Global modules
     */
    window: Dimensions.get('window')
  }
}