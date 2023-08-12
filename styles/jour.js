import { Dimensions, StyleSheet } from "react-native";
import {
  base_color,
  second_color,
  fontSize,
  fourth_color,
  red,
  third_color,
  transparent_color,
} from "./vars";

const jourStyles = StyleSheet.create({
  jourContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 50,
  },
  miniCard: {
    flexDirection: "column",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  right: {
    marginLeft: 10,
    marginBottom: 20,
    width: (Dimensions.get("window").width - 40) / 2,
  },
  left: {
    marginRight: 10,
    marginBottom: 20,
    width: (Dimensions.get("window").width - 40) / 2,
  },

  rightM: {
    marginLeft: 10,
    marginTop: 20,
    width: (Dimensions.get("window").width - 100) / 2,
  },
  leftM: {
    marginRight: 10,
    marginTop: 20,
    width: (Dimensions.get("window").width - 100) / 2,
  },

  miniCardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  p: {
    fontSize: 1.2 * fontSize,
    textAlign: "right",
  },
  miniCardTitle: {
    fontSize: fontSize,
  },
  actionsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  actionIconLeft: {
    marginRight: 5,
  },
  actionIconRight: {
    marginLeft: 5,
  },
  addButtonContainer: {
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "row",
  },
  circleBtn: {
    backgroundColor: transparent_color,
    marginVertical: 20,
  },
  depenseModal: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
});

export default jourStyles;
// .circle-btn {
//     background-color: $base-color;
//     box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
//         rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
// }
// @media screen and (max-width: 1500px) {
//     .mini-card-container {
//         grid-template-columns: repeat(4, 1fr);
//         grid-template-rows: repeat(3, 120px);
//     }
// }
// @media screen and (max-width: 1000px) {
//     .mini-card-container {
//         grid-template-columns: repeat(3, 1fr);
//         grid-template-rows: repeat(3, 120px);
//         div {
//             &:last-child {
//                 grid-column: 2;
//             }
//         }
//     }
// }
// @media screen and (max-width: 650px) {
//     .mini-card-container {
//         grid-template-columns: repeat(2, 1fr);
//         grid-template-rows: repeat(4, 120px);
//         div {
//             &:last-child {
//                 grid-column: 1/3;
//             }
//         }
//     }
// }
// @media screen and (max-width: 650px) {
//     .mini-card-content {
//         p {
//             font-size: 1.4rem;
//         }
//         .mini-card-title {
//             font-size: 1.3rem;
//         }
//     }
// }
