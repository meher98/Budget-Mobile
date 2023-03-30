import React, { useState } from "react";
import { View, Dimensions } from "react-native";
import { calendarStyles } from "../styles/calendar";
import { verifWeekInMonth, weekParams } from "../utils/functions";
import Textc from "./Textc";

const Calendar = ({
  initialMonth,
  initialYear,
  dayClick,
  weekClick,
  monthClick,
  yearClick,
  showWeek,
  allowChangeMonth,
  otherMonths,
  week,
  changeMonthFunc,
  onPress,
}) => {
  const { JsonCalendar } = require("json-calendar");
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const width = Dimensions.get("window").width - 20;
  const [calendar, setCalendar] = useState(
    new JsonCalendar({
      languageCode: "fr",
      monthIndex: initialMonth ? initialMonth : month,
      year: initialYear ? initialYear : year,
    })
  );
  const prevMonth = () => {
    let m = calendar.options.monthIndex - 1;
    let y = calendar.options.year;
    if (m < 0) {
      m = 11;
      y = calendar.options.year - 1;
    }
    setCalendar(
      new JsonCalendar({ languageCode: "fr", monthIndex: m, year: y })
    );
    if (changeMonthFunc) {
      changeMonthFunc();
    }
  };

  const nextMonth = () => {
    let m = calendar.options.monthIndex + 1;
    let y = calendar.options.year;
    if (m > 11) {
      m = 0;
      y = calendar.options.year + 1;
    }
    setCalendar(
      new JsonCalendar({ languageCode: "fr", monthIndex: m, year: y })
    );
    if (changeMonthFunc) {
      changeMonthFunc();
    }
  };
  return (
    <View
      style={calendarStyles.calendarContainer}
      onPress={() => console.log(calendar)}
    >
      <View style={[calendarStyles.month, calendarStyles.ul, { width: width }]}>
        {allowChangeMonth ? (
          <Textc
            color="base"
            key="prev"
            onPress={() => prevMonth()}
            style={[calendarStyles.prev, calendarStyles.liMonth]}
          >
            &#10094;
          </Textc>
        ) : null}
        <Textc
          key="month"
          color="base"
          style={calendarStyles.liMonth}
          onPress={() =>
            monthClick
              ? monthClick(
                  calendar.options.year,
                  calendar.options.monthIndex + 1
                )
              : null
          }
        >
          {calendar.getMonthName(calendar.options.monthIndex)}
        </Textc>
        <Textc
          color="base"
          key="year"
          style={[{ marginLeft: 10 }, calendarStyles.liMonth]}
          onPress={() => (yearClick ? yearClick(calendar.options.year) : null)}
        >
          {calendar.options.year}
        </Textc>
        {allowChangeMonth ? (
          <Textc
            color="base"
            key="next"
            onPress={() => nextMonth()}
            style={[calendarStyles.next, calendarStyles.liMonth]}
          >
            &#10095;
          </Textc>
        ) : null}
      </View>
      <View
        style={[calendarStyles.days, showWeek ? calendarStyles.showWeek : {}]}
      >
        <View style={{ flexDirection: "row", width: width }}>
          {showWeek ? (
            <Textc
              key="sem"
              style={[
                calendarStyles.weekday,
                calendarStyles.week,
                { width: width / 8 },
              ]}
            >
              Sem
            </Textc>
          ) : null}
          {calendar?.dayNames?.map((el, i) => (
            <Textc
              key={"dn" + i}
              style={[
                calendarStyles.weekday,
                { width: showWeek ? width / 8 : width / 7 },
              ]}
            >
              {el.abbr}
            </Textc>
          ))}
        </View>
        <View style={{ flexDirection: "row", width: width }}>
          {showWeek ? (
            <Textc
              key="sem"
              style={[
                calendarStyles.weekday,
                calendarStyles.week,
                { width: width / 8 },
              ]}
            >
              Sem
            </Textc>
          ) : null}
          {calendar?.dayNames?.map((el, i) => (
            <Textc
              key={"dn" + i}
              style={[
                calendarStyles.weekday,
                { width: showWeek ? width / 8 : width / 7 },
              ]}
            >
              {el.abbr}
            </Textc>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Calendar;
