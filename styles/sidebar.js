import { base_color, fontSize, transparent_color } from "./vars";
import { StyleSheet, Dimensions } from "react-native";
import { NativeModules } from "react-native";

const { StatusBarManager } = NativeModules;

export const sidebarStyles = StyleSheet.create({
  sidebarGlobalContainer: {
    minHeight: "100%",
    backgroundColor: base_color,
  },
  sidebarContainer: {
    backgroundColor: transparent_color,
    zIndex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    width: Dimensions.get("window").width,
    height: 60,
    borderTopWidth: 0.2,
    borderColor: transparent_color,
    paddingVertical: 5,
  },
  openCloseBtn: {
    position: "absolute",
    top: (Dimensions.get("window").height * 6) / 100,
    left: 20,
    color: base_color,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 25,
  },
  openCloseBtnOpen: {
    left: 300,
  },
  sidebarBody: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  sidebarItem: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  gradientText: {
    fontSize: 0.5 * fontSize,
    textAlign: "center",
    fontFamily: "Ubuntu",
  },
  sidebarPageContainer: {
    paddingTop: StatusBarManager.HEIGHT + 10,
    paddingLeft: 10,
    paddingRight: 10,
    width: "100%",
    minHeight: Dimensions.get("window").height + StatusBarManager.HEIGHT - 60,
  },
});
