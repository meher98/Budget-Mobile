import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Calendar from "../components/Calendar";
import Card from "../components/Card";
import { globalStyles } from "../styles/global";
import { View } from "react-native";
import { DateContext } from "../utils/functions";

export default function Calendrier() {
  const [width, setWidth] = useState();
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  const navigation = useNavigation();
  const dateType = useContext(DateContext);
  const setCurrentRoute = dateType[5];
  const link = (type, ...params) => {
    let str = "";
    params.map((e) => (str += `${e}-`));
    navigation.navigate("depenses", {
      type: type,
      date: str.slice(0, -1),
    });
    setCurrentRoute("");
  };
  const onLayout = (event) => {
    setWidth(event.nativeEvent.layout.width);
  };
  return (
    <>
      <View style={globalStyles.pageContainer}>
        <Card onLayout={onLayout}>
          <Calendar
            weekClick={(...par) => link("semaine", ...par)}
            dayClick={(...par) => link("jour", ...par)}
            monthClick={(...par) => link("mois", ...par)}
            showWeek
            initialMonth={month}
            initialYear={year}
            allowChangeMonth
            otherMonths
            parentWidth={width - 20}
          />
        </Card>
      </View>
    </>
  );
}
