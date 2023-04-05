import {
  View,
  TouchableOpacity,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { modalStyles } from "../styles/modal.js";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import Card from "./Card.js";
import { fourth_color } from "../styles/vars.js";

export default function Modalc({ show, closeFunction, children }) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    if (Dimensions.get("window").height <= 500) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  }, []);
  return (
    <Modal
      visible={show}
      animationType="slide"
      transparent
      statusBarTranslucent
    >
      <View
        style={[
          isSmallScreen ? modalStyles.modalContainerSmallScreen : null,
          modalStyles.openModalContainer,
        ]}
      >
        <TouchableWithoutFeedback
          onPress={closeFunction ? closeFunction : null}
        >
          <View style={modalStyles.openModalFilter}></View>
        </TouchableWithoutFeedback>
        <View style={modalStyles.cardContainer}>
          <Card style={modalStyles.modalCard}>
            <TouchableOpacity
              style={modalStyles.modalCloseBtn}
              onPress={closeFunction ? closeFunction : null}
            >
              <AntDesign name="closecircle" size={20} color={fourth_color} />
            </TouchableOpacity>
            <View style={modalStyles.modalContentContainer}>{children}</View>
          </Card>
        </View>
      </View>
    </Modal>
  );
}
