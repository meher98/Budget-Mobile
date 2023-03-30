import React from "react";
import Modalc from "./Modal";
import RoundButton from "./RoundButton";
import "../styles/confirmModal.js";
import { View, Text } from "react-native";
import confirmModalStyles from "../styles/confirmModal.js";
import { AntDesign } from "@expo/vector-icons";
import { base_color, fontSize, fourth_color, red } from "../styles/vars";
import { modalStyles } from "../styles/modal";
import Textc from "./Textc";
export default function ConfirmModal({
  show,
  closeFunction,
  text,
  confirmFunction,
}) {
  return (
    <Modalc show={show} closeFunction={closeFunction}>
      <View style={confirmModalStyles.confirmModalContainer}>
        <Textc color="fourth" style={confirmModalStyles.h1}>
          {text ? text : ""}
        </Textc>
        <View style={{ marginTop: 30 }}>
          <AntDesign
            name="exclamationcircle"
            size={fontSize * 7}
            color={fourth_color}
          />
        </View>
        <View style={modalStyles.modalBtnContainer}>
          <RoundButton
            btnStyle={modalStyles.roundBtn}
            textStyle={modalStyles.roundBtnText}
            onPress={confirmFunction}
            title="Confirmer"
          />
          <RoundButton
            btnStyle={modalStyles.roundBtn}
            textStyle={modalStyles.roundBtnText}
            onPress={closeFunction}
            title="Annuler"
          />
        </View>
      </View>
    </Modalc>
  );
}
