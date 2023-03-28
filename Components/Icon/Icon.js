import { View, Text, Image } from 'react-native'
import React from 'react'
import styles from './styles';

const Icon = ({style,icon}) => {
  return (
    <>
    <Image source={icon} style={[styles.container,style]}/>
    </>
  )
};

export default  Icon;