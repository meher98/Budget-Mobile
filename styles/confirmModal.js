import { fontSize, red } from "./vars";
import { StyleSheet } from "react-native";

const confirmModalStyles = StyleSheet.create({
  confirmModalContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 200,
  },
  span: {
    fontSize: 10 * fontSize,
    color: red,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  h1: {
    fontSize: 1.5 * fontSize,
    fontWeight: "600",
    // marginBottom: 30,
    textAlign: "center",
  },
});
export default confirmModalStyles;
