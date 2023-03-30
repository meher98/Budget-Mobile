import React, { useEffect, useRef, useState } from "react";
import Inputstyles from "../styles/input.js";
import {
  View,
  TextInput,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { BsFillCalendarMinusFill } from "react-icons/bs";
import "../styles/input.js";
import Calendar from "./Calendar";
import { NumberInput } from "./NumberInput";
import { connect } from "formik";
import Modalc from "./Modal.js";
import { fontSize } from "../styles/vars.js";

export default function Input({
  style,
  onFocus,
  onBlur,
  icon,
  placeholder,
  error,
  type,
  onChange,
  value,
  date,
  allowChangeMonth,
  color,
  ...props
}) {
  const inputRef = useRef();
  const useEffectCounter = useRef(0);
  const [focusSpan, setFocusSpan] = useState(false);
  const [focus, setFocus] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    setFocusSpan(
      value !== "" || (focusSpan && !["semaine", "mois"].includes(type))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  useEffect(() => {
    if (useEffectCounter.current > 0) {
      Animated.timing(scaleAnim, {
        toValue: focusSpan ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    useEffectCounter.current += +1;
  }, [focusSpan]);
  const focusFunction = (event) => {
    setTimeout(() => setFocus(true), 200);
    setFocusSpan(true);
    if (onFocus) {
      onFocus(event);
    }
  };
  const focusFunctionCalendar = (event) => {
    focusFunction(event);
    setOpenCalendar(true);
    inputRef?.current?.blur();
  };
  const blurFucntion = (event) => {
    setTimeout(() => setFocus(false), 200);
    if (value === "") {
      setFocusSpan(false);
    } else {
      setFocusSpan(true);
    }
    if (onBlur) {
      onBlur(event);
    }
  };

  const focusInput = () => {
    inputRef?.current?.focus();
  };

  const handleChangeClendar = (y, m, d) => {
    onChange(
      `${d.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}/${m.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}/${y}`
    );
    setOpenCalendar(false);
  };
  const localStyle = StyleSheet.create({
    colorStyle: {
      color: color,
      borderColor: color,
    },
  });

  return (
    <View style={Inputstyles.customInputErrorContainer}>
      {type === "semaine" || type === "mois" ? (
        <>
          <View
            style={[
              Inputstyles.customInputContainer,
              color ? localStyle.colorStyle : null,
              style ? style : null,
              error ? Inputstyles.customInputContainerError : null,
            ]}
          >
            <Pressable style={Inputstyles.label}>
              <Animated.View
                style={[
                  Inputstyles.span,
                  {
                    transform: [
                      {
                        translateY: scaleAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [10, -7],
                        }),
                      },
                      {
                        scale: scaleAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 0.7],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <Text
                  style={[
                    Inputstyles.span,
                    color ? localStyle.colorStyle : null,
                  ]}
                >
                  {placeholder}
                </Text>
              </Animated.View>
              <TextInput
                cursorColor={color}
                ref={inputRef}
                onFocus={(event) => focusFunctionCalendar(event)}
                onBlur={(event) => blurFucntion(event)}
                style={[
                  Inputstyles.customInput,
                  color ? localStyle.colorStyle : null,
                ]}
                type="text"
                inputmode="none"
                value={value}
                autocomplete="off"
                {...props}
                showSoftInputOnFocus={false}
              />
            </Pressable>
            {value !== "" ? (
              <TouchableOpacity
                onPress={() => onChange("")}
                style={Inputstyles.iconContainer}
              >
                <AntDesign name="close" size={fontSize} color={color} />
              </TouchableOpacity>
            ) : null}
          </View>
          <Modalc
            show={openCalendar}
            closeFunction={() => setOpenCalendar(false)}
          >
            <Calendar
              onClick={() => setClickInsideCalender(true)}
              allowChangeMonth={allowChangeMonth}
              changeMonthFunc={() => inputRef?.current?.focus()}
              dayClick={handleChangeClendar}
              initialMonth={parseInt(date?.split("-")[1]) - 1}
              initialYear={date?.split("-")[0]}
              week={date?.split("-")[2] ? parseInt(date?.split("-")[2]) : false}
              otherMonths={!date ? true : date.split("-")[2] ? true : false}
              parentWidth={Dimensions.get("window").width - 80}
            />
          </Modalc>
        </>
      ) : (
        <View
          onClick={focusInput}
          onFocus={focusInput}
          style={[
            Inputstyles.customInputContainer,
            color ? localStyle.colorStyle : null,
            style ? style : null,
            error ? Inputstyles.customInputContainerError : null,
          ]}
        >
          <Pressable onPressIn={focusInput} style={Inputstyles.label}>
            <Animated.View
              style={[
                Inputstyles.span,
                {
                  transform: [
                    {
                      translateY: scaleAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [10, -7],
                      }),
                    },
                    {
                      scale: scaleAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0.7],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Text
                style={[Inputstyles.span, color ? localStyle.colorStyle : null]}
              >
                {placeholder}
              </Text>
            </Animated.View>

            {type === "number" ? (
              <NumberInput
                cursorColor={color}
                ref={inputRef}
                onFocus={(event) => focusFunction(event)}
                onBlur={(event) => blurFucntion(event)}
                style={[
                  Inputstyles.customInput,
                  color ? localStyle.colorStyle : null,
                ]}
                onChange={onChange}
                type="text"
                value={value}
                {...props}
                autocomplete="off"
              />
            ) : (
              <TextInput
                cursorColor={color}
                ref={inputRef}
                onFocus={(event) => focusFunction(event)}
                onBlur={(event) => blurFucntion(event)}
                style={[
                  Inputstyles.customInput,
                  color ? localStyle.colorStyle : null,
                ]}
                onChangeText={onChange}
                type={type}
                value={value}
                autocomplete="off"
                {...props}
              />
            )}
          </Pressable>
          {/* <View style={Inputstyles.iconContainer}>
         {icon}
            </View> */}
        </View>
      )}

      {error ? (
        <Text style={Inputstyles.customInputErrorMsg}>{error}</Text>
      ) : null}
    </View>
  );
}
