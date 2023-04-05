import React from "react";
import { ScrollView } from "react-native";
import { cardStyles } from "../styles/card.js";

export default function Card({ gradientStyle, children, style, ...props }) {
  return (
    <ScrollView
      {...props}
      horizontal={true}
      style={[cardStyles.cardContainer, style]}
    >
      {children}

      {/* {children} */}
    </ScrollView>
  );
}
