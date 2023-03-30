import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const CirlcleButton = ({ onPress, title, textStyle, btnStyle }) => {
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
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};
export default CirlcleButton;
