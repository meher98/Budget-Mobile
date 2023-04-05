import { StyleSheet } from "react-native";
import {
  base_color,
  fontSize,
  fourth_color,
  second_color,
  third_color,
} from "./vars";

export const calendarStyles = StyleSheet.create({
  calendarContainer: {
    width: "100%",
  },

  month: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: fourth_color,
    textAlign: "center",
    borderRadius: 5,
  },
  prev: {
    marginRight: "auto",
    padding: 5,
  },
  next: {
    marginLeft: "auto",
    padding: 5,
  },
  ul: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    flexWrap: "wrap",
    margin: 0,
    padding: 0,
    position: "relative",
  },
  liMonth: {
    textTransform: "uppercase",
    letterSpacing: 3,
    fontSize: fontSize,
  },
  days: {
    paddingTop: 30,
    paddingBottom: 30,
    margin: 0,
    justifyContent: "space-evenly",
  },
  li: {
    justifyContent: "center",
    alignSelf: "center",
    textAlign: "center",
    fontSize: 0.87 * fontSize,
    color: fourth_color,
  },
  notInMonth: {
    color: fourth_color + "66",
  },
  weekday: {
    color: second_color,
    textAlign: "center",
    // fontSize: "14rem",
    marginBottom: 10,
  },
  week: {
    color: third_color,
  },
  active: {
    borderWidth: 1,
    borderColor: fourth_color,
    borderRadius: 100,
    backgroundColor: fourth_color,
    color: base_color,
  },
});
// @media screen and (max-width: 500px): {
//     days: {
//         li: {
//             height: 30px,
//             width: 30px,
//             font-size: 1rem,
//         },
//         weekday: {
//             font-size: 12rem,
//         },
//     },
//     month: {
//         ul: {
//             li: {
//                 font-size: 14rem,
//             },
//         },
//         prev: {
//             position: absolute,
//             left: 30px,
//             margin-right: 0,
//         },
//         next: {
//             position: absolute,
//             right: 30px,
//             margin-right: 0,
//         },
//     },
// }
// },)
