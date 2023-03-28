import { View, Text } from "react-native";
import React from "react";
import styles from "./styles";

const AppText = ({ style,children }) => {
  return (
    <>
      <Text style={[styles.container, style]}>{children}</Text>
    </>
  );
};

export default AppText;
