import { Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/global";
import {
  base_color,
  fourth_color,
  second_color,
  third_color,
} from "../styles/vars";

const Textc = ({ children, color, style, onPress, touchStyle }) => {
  const getColor = (c) => {
    switch (c) {
      case "base":
        return base_color;

      case "second":
        return second_color;

      case "third":
        return third_color;

      case "fourth":
        return fourth_color;

      default:
        return fourth_color;
    }
  };
  return onPress ? (
    <TouchableOpacity onPress={onPress} style={touchStyle}>
      <Text style={[{ color: getColor(color) }, globalStyles.text, style]}>
        {children}
      </Text>
    </TouchableOpacity>
  ) : (
    <Text style={[{ color: getColor(color) }, style, globalStyles.text]}>
      {children}
    </Text>
  );
};

export default Textc;
