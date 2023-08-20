import { TouchableOpacity, View } from "react-native";
import React from "react";
import Textc from "./Textc";
import { calendarStyles } from "../styles/calendar";
import { paginationStyles } from "../styles/pagination";
import { AntDesign } from "@expo/vector-icons";
import { fourth_color } from "../styles/vars";

export default function Pagination({ n, d, index, setIndex }) {
  const range = ({
    from = 0,
    to,
    step = 1,
    length = Math.ceil((to - from) / step),
  }) => Array.from({ length }, (_, i) => from + i * step);
  const prev = () => {
    if (index > 1) {
      setIndex(index - 1);
    }
  };
  const next = () => {
    if (index < n / d) {
      setIndex(index + 1);
    }
  };
  return (
    <View style={paginationStyles.paginationContainer}>
      <TouchableOpacity style={paginationStyles.li} onPress={() => prev()}>
        <AntDesign name="left" size={15} color={fourth_color} />
      </TouchableOpacity>
      {range({ from: 1, to: n / d + 1 }).map((el) => (
        <TouchableOpacity
          onPress={() => setIndex(el)}
          style={[
            el === index ? calendarStyles.active : {},
            paginationStyles.li,
          ]}
        >
          <Textc color={el === index ? "base" : ""}>{el}</Textc>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={paginationStyles.li} onPress={() => next()}>
        <AntDesign name="right" size={15} color={fourth_color} />
      </TouchableOpacity>
    </View>
  );
}
