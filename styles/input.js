import { base_color, fontSize, fourth_color, red } from "./vars";
import { StyleSheet } from "react-native";

const Inputstyles = StyleSheet.create({
  customInputErrorContainer: {
    position: "relative",
    marginBottom: 0.8 * fontSize,
  },
  customInputContainer: {
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 10,
    paddingTop: 25,
    position: "relative",
  },
  iconContainer: {
    position: "absolute",
    right: 0,
    bottom: 10,
  },
  label: {
    width: "100%",
  },
  span: {
    position: "absolute",
    left: 0,
    top: 0,
    fontSize: 1.5 * fontSize,
    fontFamily: "Ubuntu",
    // transition: "all $transition-time",
  },

  customInput: {
    backgroundColor: "transparent",
    // color: "inherit",
    borderWidth: 0,
    width: "100%",
    marginTop: 15,
    paddingBottom: 5,
    fontSize: fontSize,
    fontStyle: "Ubuntu",
  },
  inputCalendarContainer: {
    position: "absolute",
    // width: "fit-content",
    left: "50%",
    transform: [
      { scaleX: 0.6 },
      //   { translateX: "-80%" },
      //   { translateY: "calc(-40% + 50px)" },
    ],
    backgroundColor: base_color,
    borderRadius: 5,
    zIndex: 10,
    boxShadow:
      "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
  },
  customInputContainerError: {
    color: red,
  },
  customInputErrorMsg: {
    position: "absolute",
    bottom: -17,
    marginTop: 5,
    fontSize: 0.8 * fontSize,
    color: fourth_color,
  },
});

export default Inputstyles;
// @media (max-height: 830px) {
//     .input-calendar-container {
//         position: absolute;
//         width: fit-content;
//         top: 0;
//     }
// }
// @media (max-height: 700px) {
//     .input-calendar-container {
//         position: absolute;
//         width: fit-content;
//         top: 0;
//         min-width: 350px;
//         transform: scale(0.6) translate(-80%, calc(-100% + 50px));
//     }
// }
