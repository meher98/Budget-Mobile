import { StyleSheet, Dimensions } from "react-native";
import { fourth_color } from "./vars";
export const paginationStyles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    borderTopColor: fourth_color,
    borderTopWidth: 1,
    width: "100%",
    justifyContent: "center",
    paddingTop: 15,
    paddingBottom: 10,
  },
  li: {
    width: 25,
    height: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginHorizontal: 2,
  },
});
