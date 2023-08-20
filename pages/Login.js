import { Dimensions, Image, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { base_color, fourth_color, transparent_color } from "../styles/vars";
import Fingerprint from "../icons/Fingerprint";

export default function Login(args) {
  return (
    <View
      style={[
        {
          backgroundColor: base_color,
          height: "100%",
          paddingVertical: "20%",
          alignItems: "center",
          justifyContent: "space-between",
        },
      ]}
    >
      <Image
        style={{
          height: Dimensions.get("window").height / 2.7,
          width: Dimensions.get("window").height / 2.7,
        }}
        source={require("../assets/splash.png")}
      />
      <TouchableOpacity
        style={{
          padding: 7,
          backgroundColor: transparent_color,
          borderRadius: 100,
        }}
        {...args}
      >
        <Fingerprint color={fourth_color} size={3.7} />
      </TouchableOpacity>
    </View>
  );
}
