import React, { useContext, useEffect, useRef, useState } from "react";
import {
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  BackHandler,
} from "react-native";
import { Octicons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { deg } from "react-native-linear-gradient-degree";
import Textc from "./Textc";
import { Image } from "react-native";
import { DateContext, getWeekFromDate } from "../utils/functions";
import { sidebarStyles } from "../styles/sidebar";
import {
  base_color,
  base_color_deg,
  fourth_color,
  second_color,
  third_color,
} from "../styles/vars";
import { Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Sidebar(props) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const useEffectCounter = useRef(0);
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const [open, setOpen] = useState(false);
  const [pageDate, setPageDate, type, setType, currentRoute, setCurrentRoute] =
    useContext(DateContext);

  const navigation = useNavigation();
  const handleSidebar = () => {
    setOpen(!open);
    Keyboard.dismiss();
  };
  useEffect(() => {
    const backAction = () => {
      navigation?.navigate("Home");
      setCurrentRoute("Home");

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [currentRoute]);
  useEffect(() => {
    if (useEffectCounter.current > 0) {
      Animated.timing(scaleAnim, {
        toValue: open ? 0 : 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }
    useEffectCounter.current += +1;
  }, [open]);

  const screenW = Dimensions.get("window").width;
  return (
    <LinearGradient
      // Button Linear Gradient
      colors={[third_color, second_color]}
      style={sidebarStyles.sidebarGlobalContainer}
      {...deg(45)}
    >
      <View style={[sidebarStyles.sidebarPageContainer]}>{props.children}</View>

      {open ? (
        <TouchableWithoutFeedback onPress={handleSidebar}>
          <View style={[sidebarStyles.sidebarFilter]}></View>
        </TouchableWithoutFeedback>
      ) : null}
      <TouchableOpacity
        onPress={handleSidebar}
        style={[
          sidebarStyles.openCloseBtn,

          {
            transform: [
              {
                translateX: scaleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [screenW * 0.8, 0],
                }),
              },
              {
                rotate: scaleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "180deg"],
                }),
              },
            ],
          },
        ]}
      >
        {/* <HiOutlineBars3 /> */}
        <Octicons
          name="three-bars"
          size={30}
          color={!open ? base_color : second_color}
        />
      </TouchableOpacity>
      <Animated.View
        style={[
          sidebarStyles.sidebarContainer,

          {
            transform: [
              {
                translateX: scaleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -screenW * 0.8 - 10],
                }),
              },
            ],
          },
        ]}
      >
        <LinearGradient
          style={{ height: "100%" }}
          colors={[base_color, base_color_deg]}
          {...deg(45)}
        >
          <View style={sidebarStyles.sidebarLogo}>
            <Image
              style={sidebarStyles.img}
              source={require("../images/logo.png")}
            />
          </View>
          <View style={sidebarStyles.sidebarBody}>
            <TouchableOpacity
              style={[
                sidebarStyles.sidebarItem,
                navigation?.getCurrentRoute()?.name === "Home" ||
                currentRoute === "Home"
                  ? sidebarStyles.active
                  : {},
              ]}
              onPress={() => {
                setCurrentRoute("Home");
                navigation?.navigate("Home");
              }}
            >
              <FontAwesome5
                name="th"
                size={23}
                color={
                  navigation?.getCurrentRoute()?.name === "Home" ||
                  currentRoute === "Home"
                    ? base_color
                    : fourth_color
                }
              />

              <Textc
                color={
                  navigation?.getCurrentRoute()?.name === "Home" ||
                  currentRoute === "Home"
                    ? "base"
                    : "fourth"
                }
                style={sidebarStyles.gradientText}
              >
                Résumé
              </Textc>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                sidebarStyles.sidebarItem,
                navigation?.getCurrentRoute()?.name === "Budgetisation" ||
                currentRoute === "Budgetisation"
                  ? sidebarStyles.active
                  : {},
              ]}
              onPress={() => {
                setCurrentRoute("Budgetisation");
                navigation?.navigate("Budgetisation");
              }}
            >
              {/* <FaMoneyBillWaveAlt /> */}
              <FontAwesome5
                name="money-bill-wave"
                size={18}
                color={
                  navigation?.getCurrentRoute()?.name === "Budgetisation" ||
                  currentRoute === "Budgetisation"
                    ? base_color
                    : fourth_color
                }
              />
              <Textc
                color={
                  navigation?.getCurrentRoute()?.name === "Budgetisation" ||
                  currentRoute === "Budgetisation"
                    ? "base"
                    : "fourth"
                }
                style={sidebarStyles.gradientText}
              >
                Budgetisation
              </Textc>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                sidebarStyles.sidebarItem,
                navigation?.getCurrentRoute()?.name === "Calendrier" ||
                currentRoute === "Calendrier"
                  ? sidebarStyles.active
                  : {},
              ]}
              onPress={() => {
                setCurrentRoute("Calendrier");
                navigation?.navigate("Calendrier");
              }}
            >
              <Textc color="base">{/* <BsCalendarFill /> */}</Textc>
              <FontAwesome5
                name="calendar-day"
                size={24}
                color={
                  navigation?.getCurrentRoute()?.name === "Calendrier" ||
                  currentRoute === "Calendrier"
                    ? base_color
                    : fourth_color
                }
              />
              <Textc
                color={
                  navigation?.getCurrentRoute()?.name === "Calendrier" ||
                  currentRoute === "Calendrier"
                    ? "base"
                    : "fourth"
                }
                style={sidebarStyles.gradientText}
              >
                Calendrier
              </Textc>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                sidebarStyles.sidebarItem,
                (navigation?.getCurrentRoute()?.name === "depenses" ||
                  currentRoute === "depenses") &&
                pageDate === `${year}-${month}-${day}` &&
                type === "jour"
                  ? sidebarStyles.active
                  : {},
              ]}
              onPress={() => {
                setCurrentRoute("depenses");
                navigation.navigate("depenses", {
                  type: "jour",
                  date: `${year}-${month}-${day}`,
                });
              }}
            >
              <FontAwesome5
                name="shopping-bag"
                size={24}
                color={
                  (navigation?.getCurrentRoute()?.name === "depenses" ||
                    currentRoute === "depenses") &&
                  pageDate === `${year}-${month}-${day}` &&
                  type === "jour"
                    ? base_color
                    : fourth_color
                }
              />
              <Textc
                color={
                  (navigation?.getCurrentRoute()?.name === "depenses" ||
                    currentRoute === "depenses") &&
                  pageDate === `${year}-${month}-${day}` &&
                  type === "jour"
                    ? "base"
                    : "fourth"
                }
                style={sidebarStyles.gradientText}
              >
                Aujourd'hui
              </Textc>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                sidebarStyles.sidebarItem,
                (navigation?.getCurrentRoute()?.name === "depenses" ||
                  currentRoute === "depenses") &&
                pageDate === getWeekFromDate(year, month - 1, day) &&
                type === "semaine"
                  ? sidebarStyles.active
                  : {},
              ]}
              onPress={() => {
                setCurrentRoute("depenses");
                navigation.navigate("depenses", {
                  type: "semaine",
                  date: getWeekFromDate(year, month - 1, day),
                });
              }}
            >
              <FontAwesome5
                name="shopping-basket"
                size={24}
                color={
                  (navigation?.getCurrentRoute()?.name === "depenses" ||
                    currentRoute === "depenses") &&
                  pageDate === getWeekFromDate(year, month - 1, day) &&
                  type === "semaine"
                    ? base_color
                    : fourth_color
                }
              />
              <Textc
                color={
                  (navigation?.getCurrentRoute()?.name === "depenses" ||
                    currentRoute === "depenses") &&
                  pageDate === getWeekFromDate(year, month - 1, day) &&
                  type === "semaine"
                    ? "base"
                    : "fourth"
                }
                style={sidebarStyles.gradientText}
              >
                Cette semaine
              </Textc>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                sidebarStyles.sidebarItem,
                (navigation?.getCurrentRoute()?.name === "depenses" ||
                  currentRoute === "depenses") &&
                pageDate === `${year}-${month}` &&
                type === "mois"
                  ? sidebarStyles.active
                  : {},
              ]}
              onPress={() => {
                setCurrentRoute("depenses");
                navigation.navigate("depenses", {
                  type: "mois",
                  date: `${year}-${month}`,
                });
              }}
            >
              <FontAwesome5
                name="shopping-cart"
                size={24}
                color={
                  (navigation?.getCurrentRoute()?.name === "depenses" ||
                    currentRoute === "depenses") &&
                  pageDate === `${year}-${month}` &&
                  type === "mois"
                    ? base_color
                    : fourth_color
                }
              />
              <Textc
                color={
                  (navigation?.getCurrentRoute()?.name === "depenses" ||
                    currentRoute === "depenses") &&
                  pageDate === `${year}-${month}` &&
                  type === "mois"
                    ? "base"
                    : "fourth"
                }
                style={sidebarStyles.gradientText}
              >
                Ce mois
              </Textc>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Animated.View>
    </LinearGradient>
  );
}

// export default function Sidebar(props) {
//   const date = new Date();
//   const day = date.getDate();
//   const month = date.getMonth() + 1;
//   const year = date.getFullYear();
//   const href = useHref();
//   const [open, setOpen] = useState(true);
//   const navigate = useNavigate();
//   const handleSidebar = () => {
//     setOpen(!open);
//   };

//   return (
//     <div className="sidebar-global-container">
//       <div className={`sidebar-container ${open ? "open" : ""}`}>
//         <div className="sidebar-logo">
//           <img src={logo} alt="logo" />
//         </div>
//         <div className="sidebar-body">
//           <div
//             className={`sidebar-item ${href === "/" ? "active" : ""}`}
//             onClick={() => navigate("/")}
//           >
//             <BsFillGrid3X3GapFill />
//             <p className="gradient-textcTextc">Résumé</p>
//           </div>
//           <div
//             className={`sidebar-item ${
//               href === "/budgetisation" ? "active" : ""
//             }`}
//             onClick={() => navigate("/budgetisation")}
//           >
//             <FaMoneyBillWaveAlt />
//             <p className="gradient-textcTextc">Budgetisation</p>
//           </div>
//           <div
//             className={`sidebar-item ${href === "/graphique" ? "active" : ""}`}
//             onClick={() => navigate("/")}
//           >
//             <BsBarChartLineFill />
//             <p className="gradient-textcTextc">Graphique</p>
//           </div>
//           <div
//             className={`sidebar-item ${href === "/calendrier" ? "active" : ""}`}
//             onClick={() => navigate("/calendrier")}
//           >
//             <BsCalendarFill />
//             <p className="gradient-textcTextc">Calendrier</p>
//           </div>
//           <div
//             className={`sidebar-item ${
//               href === `/depenses/jour/${year}-${month}-${day}` ? "active" : ""
//             }`}
//             onClick={() => navigate(`/depenses/jour/${year}-${month}-${day}`)}
//           >
//             <BsFillBagFill />
//             <p className="gradient-textcTextc">Aujourd'hui</p>
//           </div>
//           <div
//             className={`sidebar-item ${
//               href === `/depenses/semaine/${getWeekFromDate(year, month-1, day)}`
//                 ? "active"
//                 : ""
//             }`}
//             onClick={() =>
//               navigate(`/depenses/semaine/${getWeekFromDate(year, month-1, day)}`)
//             }
//           >
//             <BsFillBasket3Fill />
//             <p className="gradient-textcTextc">Cette semaine</p>
//           </div>
//           <div
//             className={`sidebar-item ${
//               href === `/depenses/mois/${year}-${month}` ? "active" : ""
//             }`}
//             onClick={() => navigate(`/depenses/mois/${year}-${month}`)}
//           >
//             <BsFillCartFill />
//             <p className="gradient-textcTextc">Ce mois</p>
//           </div>
//         </div>
//       </div>
//       <div
//         onClick={handleSidebar}
//         className={`sidebar-filter ${open ? "open" : ""}`}
//       ></div>
//       <div className={`sidebar-page-container ${open ? "open" : ""}`}>
//         <div
//           onClick={handleSidebar}
//           className={`open-close-btn ${open ? "open" : ""}`}
//         >
//           <HiOutlineBars3 />
//         </div>
//         {props.children}
//       </div>
//     </div>
//   );
// }
