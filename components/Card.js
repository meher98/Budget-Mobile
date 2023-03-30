import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView } from "react-native";
import { deg } from "react-native-linear-gradient-degree";
import { cardStyles } from "../styles/card.js";
import { base_color, base_color_deg } from "../styles/vars.js";

export default function Card({ gradientStyle, children, style, ...props }) {
  return (
    <LinearGradient
      colors={[base_color, base_color_deg]}
      style={[cardStyles.cardContainerGradient, gradientStyle]}
      {...deg(45)}
    >
      <ScrollView
        {...props}
        horizontal={true}
        style={[cardStyles.cardContainer, style]}
      >
        {children}

        {/* {children} */}
      </ScrollView>
    </LinearGradient>
  );
}
