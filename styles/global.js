import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  pageContainer: {
    // marginBottom: 60,
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
  text: {
    fontFamily: "Ubuntu",
  },
  waveBG: {
    resizeMode: "cover",
    justifyContent: "center",
    borderRadius: 10,
    opacity: 0.3,
  },
});
