import { View, Text } from 'react-native'
import React from 'react'
import styles from '../View/styles'


const AppView = ({style,children}) => {
  return (
    <View style={[styles.container,style] }>
      {children}
    </View>
  )
}

export default AppView