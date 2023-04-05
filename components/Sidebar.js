import React, { useContext, useEffect, useRef, useState } from "react";
import {
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
  BackHandler,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { deg } from "react-native-linear-gradient-degree";
import Textc from "./Textc";
import { DateContext, getWeekFromDate, twoDigits } from "../utils/functions";
import { sidebarStyles } from "../styles/sidebar";
import { fourth_color, second_color, third_color } from "../styles/vars";
import { Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Day from "../icons/Day";
import Calendar from "../icons/Calendar";
import Budget from "../icons/Budget";
import Home from "../icons/Home";
import Week from "../icons/Week";
import Month from "../icons/Month";

export default function Sidebar(props) {
  const useEffectCounter = useRef(0);
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const [pageDate, setPageDate, type, setType, currentRoute, setCurrentRoute] =
    useContext(DateContext);
  const navigation = useNavigation();
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

  return (
    <View style={sidebarStyles.sidebarGlobalContainer}>
      <View style={sidebarStyles.sidebarPageContainer}>
        <LinearGradient
          colors={[second_color, third_color]}
          {...deg(45)}
          style={{
            backgroundColor: second_color,
            width: 310,
            height: 250,
            position: "absolute",
            top: -50,
            left: -20,
            zIndex: -1,
            borderRadius: 60,
            transform: [{ rotate: "50deg" }],
          }}
        ></LinearGradient>
        {props.children}
      </View>
      <View style={sidebarStyles.sidebarContainer}>
        <TouchableOpacity
          style={sidebarStyles.sidebarItem}
          onPress={() => {
            setCurrentRoute("Home");
            navigation?.navigate("Home");
          }}
        >
          <Home
            color={fourth_color}
            size={2}
            filled={
              navigation?.getCurrentRoute()?.name === "Home" ||
              currentRoute === "Home"
            }
          />
          <Textc color="fourth" style={sidebarStyles.gradientText}>
            Accueil
          </Textc>
        </TouchableOpacity>
        <TouchableOpacity
          style={sidebarStyles.sidebarItem}
          onPress={() => {
            setCurrentRoute("Budgetisation");
            navigation?.navigate("Budgetisation");
          }}
        >
          <Budget
            color={fourth_color}
            size={2}
            filled={
              navigation?.getCurrentRoute()?.name === "Budgetisation" ||
              currentRoute === "Budgetisation"
            }
          />
          <Textc color="fourth" style={sidebarStyles.gradientText}>
            Budgets
          </Textc>
        </TouchableOpacity>
        <TouchableOpacity
          style={sidebarStyles.sidebarItem}
          onPress={() => {
            setCurrentRoute("Calendrier");
            navigation?.navigate("Calendrier");
          }}
        >
          <Calendar
            color={fourth_color}
            size={2}
            filled={
              navigation?.getCurrentRoute()?.name === "Calendrier" ||
              currentRoute === "Calendrier"
            }
          />
          <Textc color="fourth" style={sidebarStyles.gradientText}>
            Calendrier
          </Textc>
        </TouchableOpacity>
        <TouchableOpacity
          style={sidebarStyles.sidebarItem}
          onPress={() => {
            setCurrentRoute("depenses");
            navigation.navigate("depenses", {
              type: "jour",
              date: `${year}-${twoDigits(month)}-${twoDigits(day)}`,
            });
          }}
        >
          <Day
            size={2}
            color={fourth_color}
            filled={
              (navigation?.getCurrentRoute()?.name === "depenses" ||
                currentRoute === "depenses") &&
              pageDate === `${year}-${twoDigits(month)}-${twoDigits(day)}` &&
              type === "jour"
            }
          />
          <Textc color="fourth" style={sidebarStyles.gradientText}>
            Ma journée
          </Textc>
        </TouchableOpacity>
        <TouchableOpacity
          style={sidebarStyles.sidebarItem}
          onPress={() => {
            setCurrentRoute("depenses");
            navigation.navigate("depenses", {
              type: "semaine",
              date: getWeekFromDate(year, month - 1, day),
            });
          }}
        >
          <Week
            color={fourth_color}
            size={2}
            filled={
              (navigation?.getCurrentRoute()?.name === "depenses" ||
                currentRoute === "depenses") &&
              pageDate === getWeekFromDate(year, month - 1, day) &&
              type === "semaine"
            }
          />
          <Textc color="fourth" style={sidebarStyles.gradientText}>
            Ma semaine
          </Textc>
        </TouchableOpacity>
        <TouchableOpacity
          style={sidebarStyles.sidebarItem}
          onPress={() => {
            setCurrentRoute("depenses");
            navigation.navigate("depenses", {
              type: "mois",
              date: `${year}-${twoDigits(month)}`,
            });
          }}
        >
          <Month
            color={fourth_color}
            size={2}
            filled={
              (navigation?.getCurrentRoute()?.name === "depenses" ||
                currentRoute === "depenses") &&
              pageDate === `${year}-${twoDigits(month)}` &&
              type === "mois"
            }
          />
          <Textc color="fourth" style={sidebarStyles.gradientText}>
            Mon mois
          </Textc>
        </TouchableOpacity>
      </View>
    </View>
  );
}
