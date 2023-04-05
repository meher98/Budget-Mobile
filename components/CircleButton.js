import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Textc from "./Textc";

const CircleButton = ({ onPress, title, textStyle, btnStyle }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          height: 70,
          width: 70,
          borderRadius: 100,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "500",
        },
        btnStyle,
      ]}
    >
      <Textc style={textStyle}>{title}</Textc>
    </TouchableOpacity>
  );
};
export default CircleButton;
