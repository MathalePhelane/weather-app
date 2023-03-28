import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'

const  Button = ({children, style,onPress}) => {
  return (
    <View>
    <TouchableOpacity onPress={onPress} style={[styles.container,style]}>
      {children}
    </TouchableOpacity>
    </View>
  )
}

export default Button;