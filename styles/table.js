import { Dimensions, StyleSheet } from "react-native";
import { fourth_color } from "./vars";

export const tableStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
  },
  table: {
    flexDirection: "column",
    borderColor: fourth_color,
    borderRadius: 10,
  },
  headersRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: fourth_color,
    padding: 5,
    backgroundColor: fourth_color,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: fourth_color,
    padding: 5,
  },
  lastRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  header: {
    fontFamily: "UbuntuBold",
    padding: 5,
    textAlign: "center",
  },
  cell: {
    padding: 5,
    textAlign: "center",
  },
  videText: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 10,
  },
});
