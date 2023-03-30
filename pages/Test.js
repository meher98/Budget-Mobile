import { NumberInput } from "../components/NumberInput";
import Card from "../components/Card";
import RoundButton from "../components/RoundButton";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Input from "../components/Input";
import { fourth_color, third_color } from "../styles/vars";
import ConfirmModal from "../components/ConfirmModal";
import { globalStyles } from "../styles/global";

export default function Test() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  return (
    <View style={globalStyles.pageContainer}>
      <Card>
        <RoundButton title="test" onPress={() => setOpen(true)} />
      </Card>
      <View></View>
      <ConfirmModal
        text="Do you want to confirm ?"
        show={open}
        closeFunction={() => setOpen(false)}
      >
        <View>
          {/* <Input
            placeholder={"test"}
            type="number"
            value={value}
            onChange={setValue}
            color={fourth_color}
          /> */}
          <Input
            placeholder={"test"}
            type="semaine"
            value={value}
            onChange={setValue}
            color={fourth_color}
          />
        </View>
      </ConfirmModal>
    </View>
  );
}
