const { JsonCalendar } = require("json-calendar");
import { createContext } from "react";
const config = {};
const mt = require("mathjs");
const math = mt.create(mt.all, config);
export const twoDigits = (e) => {
  return e.toString().length > 1 ? e : "0" + e;
};
export const oneDigit = (e) => {
  return e.length > 1 && e[1] === "0" ? e[0] : e;
};
export const verifWeekInMonth = (w) => {
  for (let e of w) {
    var b = false;
    if (e.className.includes("month-day")) {
      b = true;
      break;
    }
  }
  return b;
};

export const weekParams = (y, m, indexW, w) => {
  if (!w[6].className.includes("month-day")) {
    if (m === 12) {
      return [y + 1, 1, 0];
    } else {
      return [y, m + 2, 0];
    }
  } else {
    return [y, m + 1, indexW];
  }
};

export const getWeekFromDate = (y, m, d) => {
  const weeks = new JsonCalendar({
    languageCode: "fr",
    monthIndex: m,
    year: y,
  }).weeks;
  var indexW;
  weeks.map((w, wi) =>
    // eslint-disable-next-line array-callback-return
    w.map((e) => {
      if (e.day === d && e.monthIndex === m) {
        indexW = wi;
      }
    })
  );
  let week = weekParams(y, m, indexW, weeks[indexW]);
  return `${twoDigits(week[0])}-${twoDigits(week[1])}-${twoDigits(week[2])}`;
};

export const getFormatWeekFromDate = (date) => {
  const [d, m, y] = date.split("/");
  let week = getWeekFromDate(parseInt(y), parseInt(m) - 1, parseInt(d));

  return `${week.split("-")[2]}/${week.split("-")[1]}/${week.split("-")[0]}`;
};

export const stopScrolling = () => {
  // To get the scroll position of current webpage
  let TopScroll = window.pageYOffset || document.documentElement.scrollTop;
  let LeftScroll = window.pageXOffset || document.documentElement.scrollLeft;

  // if scroll happens, set it to the previous value
  window.onscroll = function () {
    window.scrollTo(LeftScroll, TopScroll);
  };
};
export const returnScrolling = () => {
  window.onscroll = function () {};
};
export const capitalise = (str) => str.charAt(0).toUpperCase() + str.slice(1);
export const evaluate = (expression) => math.evaluate(expression);
export const convertDate = (date) => {
  let dateTab = date.split("/");
  dateTab = dateTab.reverse();
  return dateTab.join("-");
};
export const dateDiffrence = (date10, date20) => {
  const date1 = new Date(convertDate(date10));
  const date2 = new Date(convertDate(date20));
  const diffTime = date2 - date1;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
export const dateToTime = (d) => {
  return new Date(convertDate(d)).getTime();
};
export const timeToDate = (t) => {
  const d = new Date(t);
  return `${d.getDate().toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}/${(d.getMonth() + 1).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}/${d.getFullYear()}`;
};
export const DateContext = createContext();

export const getDatesInRange = (dateD, dateF) => {
  const startDate = new Date(convertDate(dateD));
  const endDate = new Date(convertDate(dateF));
  const date = new Date(startDate.getTime());
  date.setDate(date.getDate());

  const dates = [];

  while (date <= endDate) {
    let newDate = new Date(date);
    dates.push(
      `${twoDigits(newDate.getDate())}/${twoDigits(newDate.getMonth() + 1)}/${
        newDate.getYear() + 1900
      }`
    );
    date.setDate(date.getDate() + 1);
  }
  return dates;
};
export const dateDisplay = (date) => {
  let newDate = "";
  for (let i = 0; i < date?.length; i++) {
    if (i === 5) {
      newDate += "\n";
    } else {
      newDate += date[i];
    }
  }
  return newDate;
};
