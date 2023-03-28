import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'
import LottieView from 'lottie-react-native';


const  Loading =()=>{
  return (
    <View style ={styles.container}>
        <LottieView source={require('../../assets/99680-3-dots-loading.json')}autoPlay loop/>   
    </View>
  )
}

export default Loading