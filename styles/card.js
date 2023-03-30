import { StyleSheet } from "react-native";
import { base_color, fourth_color } from "./vars.js";

export const cardStyles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    borderRadius: 10,
    flexGrow: 0,
  },
  cardContainerGradient: {
    width: "100%",
    padding: 10,
    backgroundColor: base_color,
    borderRadius: 10,
    shadowColor: "#A0A0A0",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    elevation: 4,
    flexGrow: 0,
  },
});
