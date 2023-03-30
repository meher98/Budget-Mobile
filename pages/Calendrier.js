import React, { useState } from "react";
import Calendar from "../components/Calendar";
import Card from "../components/Card";

export default function Calendrier({ navigation }) {
  const [width, setWidth] = useState();
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  const link = (type, ...params) => {
    let str = `/depenses/${type}/`;
    params.map((e) => (str += `${e}-`));
    navigation.navigate(str.slice(0, -1));
  };
  const onLayout = (event) => {
    setWidth(event.nativeEvent.layout.width);
    console.log(event.nativeEvent.layout.width);
  };
  return (
    <>
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
    </>
  );
}
