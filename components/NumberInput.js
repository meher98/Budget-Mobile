import React, { forwardRef } from "react";
import { TextInput } from "react-native";

export const NumberInput = forwardRef(function NumberInput(
  { onChange, id, ...params },
  ref
) {
  const changeFunction = (val) => {
    let i = val.length - 1;
    let char = val[i];
    let arr = ["*", "/", "+", "-", "(", ")", "."];
    if (val[0] === "=") {
      if ((!isNaN(char) || arr.includes(char) || val.length === 0) && i > 0) {
        onChange(val);
      } else {
        if (char === "=" && i === 0) {
          onChange(val);
        }
      }
    } else {
      if (!isNaN(char) || char === "." || val.length === 0) {
        onChange(val);
      }
    }
  };
  return (
    <TextInput
      ref={ref}
      {...params}
      id={id}
      onChangeText={(e) => changeFunction(e)}
      keyboardType="numeric"
    />
  );
});
