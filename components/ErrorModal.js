import React from "react";
import Modalc from "./Modal";
import RoundButton from "./RoundButton";
import "../styles/confirmModal.js";
import { View } from "react-native";
import confirmModalStyles from "../styles/confirmModal.js";
import { AntDesign } from "@expo/vector-icons";
import { fontSize, fourth_color } from "../styles/vars";
import { modalStyles } from "../styles/modal";
import Textc from "./Textc";
export default function ErrorModal({ show, closeFunction, text }) {
  return (
    <Modalc show={show} closeFunction={closeFunction}>
      <View style={confirmModalStyles.confirmModalContainer}>
        <Textc color="fourth" style={confirmModalStyles.h1}>
          Oops!
        </Textc>
        <View style={{ marginTop: 30, alignItems: "center" }}>
          <AntDesign
            name="exclamationcircle"
            size={fontSize * 7}
            color={fourth_color}
          />
          <Textc
            color="fourth"
            style={[confirmModalStyles.h1, { marginTop: 30 }]}
          >
            {text ? text : ""}
          </Textc>
        </View>

        <View style={modalStyles.modalBtnContainer}>
          <RoundButton
            btnStyle={modalStyles.roundBtn}
            textStyle={modalStyles.roundBtnText}
            onPress={closeFunction}
            title="OK"
          />
        </View>
      </View>
    </Modalc>
  );
}
