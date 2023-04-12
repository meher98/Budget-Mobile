import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Dimensions } from "react-native";
import { calendarStyles } from "../styles/calendar";
import { twoDigits, verifWeekInMonth, weekParams } from "../utils/functions";
import { AntDesign } from "@expo/vector-icons";
import Grid from "./Grid";
import Textc from "./Textc";
import { base_color } from "../styles/vars";

function Calendar({
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
  parentWidth,
}) {
  const { JsonCalendar } = require("json-calendar");
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const nCols = showWeek ? 8 : 7;
  const [calendar, setCalendar] = useState(
    new JsonCalendar({
      languageCode: "fr",
      monthIndex: initialMonth ? initialMonth : month,
      year: initialYear ? initialYear : year,
    })
  );
  const [width, setWidth] = useState(0);
  useEffect(() => {
    !isNaN(parentWidth) && typeof parentWidth === "number"
      ? setWidth(parentWidth)
      : setWidth(Dimensions.get("window").width - 40);
  }, [parentWidth]);

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
    <View style={calendarStyles.calendarContainer} onPress={onPress}>
      <View style={[calendarStyles.month, { width: width }]}>
        <View style={[calendarStyles.ul]}>
          {allowChangeMonth ? (
            <TouchableOpacity onPress={() => prevMonth()}>
              {/* <Textc
                color="base"
                key="prev"
                touchStyle={[calendarStyles.prev, calendarStyles.liMonth]}
                style={{ fontSize: 20 }}
              >
                &#10094;
              </Textc> */}
              <AntDesign name="leftcircle" size={24} color={base_color} />
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            onPress={() =>
              monthClick
                ? monthClick(
                    calendar.options.year,
                    calendar.options.monthIndex + 1
                  )
                : null
            }
          >
            <Textc key="month" color="base" style={calendarStyles.liMonth}>
              {calendar.getMonthName(calendar.options.monthIndex)}
            </Textc>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              yearClick ? yearClick(calendar.options.year) : null
            }
          >
            <Textc
              color="base"
              key="year"
              style={[{ marginLeft: 10 }, calendarStyles.liMonth]}
            >
              {calendar.options.year}
            </Textc>
          </TouchableOpacity>

          {allowChangeMonth ? (
            <TouchableOpacity onPress={() => nextMonth()}>
              {/* <Textc
                color="base"
                key="next"
                touchStyle={[calendarStyles.next, calendarStyles.liMonth]}
                style={{ fontSize: 20 }}
              >
                &#10095;
              </Textc> */}
              <AntDesign name="rightcircle" size={24} color={base_color} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      <View
        style={[calendarStyles.days, showWeek ? calendarStyles.showWeek : {}]}
      >
        <Grid nCols={nCols}>
          {showWeek ? (
            <Textc
              key="sem"
              style={[
                calendarStyles.li,
                calendarStyles.weekday,
                calendarStyles.week,
                {
                  width: width / nCols,
                  paddingTop: width / (2 * nCols) - 10,
                  paddingBottom: width / (2 * nCols) - 10,
                },
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
                calendarStyles.li,
                {
                  width: width / nCols,
                  paddingTop: width / (2 * nCols) - 10,
                  paddingBottom: width / (2 * nCols) - 10,
                },
              ]}
            >
              {el.abbr}
            </Textc>
          ))}
        </Grid>
        {calendar?.weeks?.map((el, ind) =>
          week || week === 0 ? (
            week === ind ? (
              <Grid nCols={nCols}>
                {showWeek ? (
                  <TouchableOpacity
                    onPress={() =>
                      weekClick
                        ? weekClick(
                            ...weekParams(
                              calendar.options.year,
                              calendar.options.monthIndex,
                              ind,
                              el
                            )
                          )
                        : null
                    }
                  >
                    <Textc
                      key={"w" + ind}
                      style={[
                        calendarStyles.week,
                        {
                          width: width / nCols,
                          paddingTop: width / (2 * nCols) - 10,
                          paddingBottom: width / (2 * nCols) - 10,
                        },
                      ]}
                    >
                      {ind}
                    </Textc>
                  </TouchableOpacity>
                ) : null}
                {el.map((e, i) => (
                  <TouchableOpacity
                    onPress={() =>
                      dayClick
                        ? (otherMonths || e.className.includes("month-day")) &&
                          dayClick(
                            e.year,
                            twoDigits(e.monthIndex + 1),
                            twoDigits(e.day)
                          )
                        : null
                    }
                  >
                    <Textc
                      key={"d" + i}
                      style={[
                        calendarStyles.li,
                        `${day}-${month}-${year}` ===
                        `${e.day}-${e.monthIndex}-${e.year}`
                          ? calendarStyles.active
                          : {},
                        e.className.includes("month-day")
                          ? {}
                          : calendarStyles.notInMonth,
                        {
                          width: width / nCols,
                          paddingTop: width / (2 * nCols) - 10,
                          paddingBottom: width / (2 * nCols) - 10,
                        },
                      ]}
                    >
                      {e.className.includes("month-day")
                        ? e.day
                        : otherMonths
                        ? e.day
                        : ""}
                    </Textc>
                  </TouchableOpacity>
                ))}
              </Grid>
            ) : null
          ) : verifWeekInMonth(el) ? (
            <Grid nCols={nCols}>
              {showWeek ? (
                <TouchableOpacity
                  onPress={() =>
                    weekClick
                      ? weekClick(
                          ...weekParams(
                            calendar.options.year,
                            calendar.options.monthIndex,
                            ind,
                            el
                          )
                        )
                      : null
                  }
                >
                  <Textc
                    key={"w" + ind}
                    style={[
                      calendarStyles.li,
                      calendarStyles.week,
                      {
                        width: width / nCols,
                        paddingTop: width / (2 * nCols) - 10,
                        paddingBottom: width / (2 * nCols) - 10,
                      },
                    ]}
                  >
                    {ind}
                  </Textc>
                </TouchableOpacity>
              ) : null}
              {el.map((e, i) => (
                <TouchableOpacity
                  onPress={() =>
                    dayClick
                      ? (otherMonths || e.className.includes("month-day")) &&
                        dayClick(
                          e.year,
                          twoDigits(e.monthIndex + 1),
                          twoDigits(e.day)
                        )
                      : null
                  }
                >
                  <Textc
                    key={"d" + i}
                    style={[
                      calendarStyles.li,
                      `${day}-${month}-${year}` ===
                      `${e.day}-${e.monthIndex}-${e.year}`
                        ? calendarStyles.active
                        : {},
                      e.className.includes("month-day")
                        ? {}
                        : calendarStyles.notInMonth,
                      {
                        width: width / nCols,
                        paddingTop: width / (2 * nCols) - 10,
                        paddingBottom: width / (2 * nCols) - 10,
                      },
                    ]}
                  >
                    {e.className.includes("month-day")
                      ? e.day
                      : otherMonths
                      ? e.day
                      : ""}
                  </Textc>
                </TouchableOpacity>
              ))}
            </Grid>
          ) : null
        )}
      </View>
    </View>
  );
}
Calendar.defaultProps = {
  parentWidth: Dimensions.get("window").width - 40,
};
export default Calendar;
