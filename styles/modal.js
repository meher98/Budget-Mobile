import { base_color, fourth_color } from "./vars";
import { StyleSheet, Dimensions } from "react-native";

export const modalStyles = StyleSheet.create({
  openModalFilter: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "200%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 1,
    display: "flex",
  },
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    height: Dimensions.get("window").height,
    padding: 10,
  },
  modalCard: {
    zIndex: 4,
    backgroundColor: base_color + "BB",
  },

  openModalContainer: {
    zIndex: 3,
  },
  modalContentContainer: {
    padding: 20,
    width: Dimensions.get("window").width - 40,
  },
  modalCloseBtn: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 3,
  },
  modalBtnContainer: {
    marginTop: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    rowGap: 100,
  },
  roundBtn: {
    backgroundColor: fourth_color,
    color: base_color,
    margin: 10,
  },
  roundBtnText: {
    color: base_color,
    fontWeight: "600",
  },

  modalContainerSmallScreen: {
    transform: [{ scale: 0.7 }],
  },
});
