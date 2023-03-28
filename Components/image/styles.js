import { Dimensions, StyleSheet } from "react-native";


const { height } = Dimensions.get('window');
const halfHeight = height / 2.4;

const styles = StyleSheet.create({
    container: {
        justifyContent:'center',
        height:halfHeight,
        

    },
});

export default styles;