import { View, Text, Modal,Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles';
import { AntDesign } from "@expo/vector-icons";


const AppModal = ({modalVisible,modalClose,children}) => {
  return (
    <View style={[styles.centeredView,styles]}>
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
       {modalClose}
      }}>
      <View style={[styles.centeredView,styles]}>
        <View style={[styles.modalView,styles]}>
        <TouchableOpacity
                    style={{

                      alignSelf: "flex-end",
                    }}
                    //  disabled = {!message}
                    onPress={ modalClose}
                    activeOpacity={0.5}
                  >
                    <AntDesign name="close" size={30} color="black" />
          </TouchableOpacity>
          {children}
         
        </View>
        
      </View>
    </Modal>

  </View>
  )
}

export default AppModal