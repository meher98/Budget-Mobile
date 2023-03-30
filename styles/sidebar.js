import { base_color, fourth_color, third_color } from "./vars";
import { StyleSheet, Dimensions } from "react-native";

export const sidebarStyles = StyleSheet.create({
  sidebarGlobalContainer: {
    minHeight: "100%",
  },
  active: {
    backgroundColor: fourth_color,
  },
  sidebarContainer: {
    backgroundColor: base_color,
    height: "100%",
    width: "80%",
    position: "absolute",
    transform: [{ translateX: -Dimensions.get("window").width * 0.8 - 10 }],
    zIndex: 2,
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
    // transition: transform calc($transitiontime * 3), marginleft $transitiontime,
    // transform: rotate(180deg),
  },
  openCloseBtnOpen: {
    // transform: rotate(0),
    left: 300,
  },
  sidebarFilter: {
    display: "none",
  },
  sidebarLogo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: (Dimensions.get("window").height * 5) / 100,
    padding: 10,
  },
  img: {
    // height: 0,
    width: 180,
    height: 180,
    // height: 200,
  },
  sidebarBody: {
    flexDirection: "column",
    paddingTop: 20,
    paddingBottom: 20,
  },
  sidebarItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
    // &:hover,
    // &active: {
    //     background: lineargradient(45deg, $thirdcolor 0%, $secondcolor 100%),
    //     color: $basecolor,

    // },
  },
  gradientText: {
    marginLeft: 10,
    fontSize: 20,
  },
  sidebarPageContainer: {
    paddingTop: (Dimensions.get("window").height * 6) / 100,
    // paddingBottom: 70,
    paddingLeft: 10,
    paddingRight: 10,
    // transition: all $transitiontime,
    width: "100%",
    minHeight: "100%",
    marginLeft: 0,
    // &open: {
    //     width: calc("100%" - 300),
    //     marginleft: 300,
    // },
  },
  sidebarFilter: {
    height: "100%",
    width: "100%",
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.7)",
    zIndex: 1,
    // &open: {
    //     display: block,
    // },
  },
});
// @media (maxwidth: 850): {
//     sidebarpagecontainer: {
//         padding: 70 10,
//         &open: {
//             width: "100%",
//             marginleft: 0,
//         },
//     },

//     openclosebtn: {
//         left: 7,
//         color: $basecolor,
//         &open: {
//             color: $secondcolor,
//         },
//     },
//     sidebarfilter: {
//         display: none,
//         height: "100%",
//         width: "100%",
//         position: fixed,
//         backgroundcolor: rgba($color: black, $alpha: 07),
//         &open: {
//             display: block,
//         },
//     },
// }})
// @media (maxwidth: 375): {
//     openclosebtn: {
//         &open: {
//             marginleft: 80%,
//         },
//     },
//     sidebarcontainer: {
//         width: 80%,
//     },
// },
