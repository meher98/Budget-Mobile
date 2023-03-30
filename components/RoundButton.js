import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

const RoundButton = ({ onPress, title, textStyle, btnStyle }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[style, btnStyle]}>
        <Text style={textStyle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  padding: 15,
  borderRadius: 5,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  fontWeight: "500",
});

export default RoundButton;
