import { base_color, third_color } from "./vars";
import { StyleSheet, Dimensions } from "react-native";

export const globalStyles = StyleSheet.create({
  pageContainer: {
    marginTop: 40,
    marginBottom: 20,
    // height: "100%",
  },
  gradientCircleBtn: {
    height: 70,
    width: 70,
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "500",
  },
});