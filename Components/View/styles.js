import { Dimensions, StyleSheet } from "react-native";
import { ColorTheme } from "../../Theme/Colors";

const { height } = Dimensions.get('window');
const halfHeight = height / 2;

const styles = StyleSheet.create({
    container: {
        backgroundColor: ColorTheme.Sunny,
        height: halfHeight,
    }
});

export default styles;