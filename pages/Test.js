import { NumberInput } from "../components/NumberInput";
import Card from "../components/Card";
import RoundButton from "../components/RoundButton";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Input from "../components/Input";
import { fourth_color, third_color } from "../styles/vars";
import ConfirmModal from "../components/ConfirmModal";
import { globalStyles } from "../styles/global";
import { exportData, importData } from "../backEnd/dao/exportImportDao";

export default function Test() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  return (
    <View style={globalStyles.pageContainer}>
      <Card>
        <RoundButton title="Import" onPress={() => importData()} />
        <RoundButton title="Export" onPress={() => exportData()} />
      </Card>
    </View>
  );
}
