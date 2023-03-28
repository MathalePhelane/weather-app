import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import styles from './styles'

const AppImage = ({ image, children }) => {
  return (
    <ImageBackground
      source={image}
      style={styles.container}>
      {children}
    </ImageBackground>
  )
}

export default AppImage