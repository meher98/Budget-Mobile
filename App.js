import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import Sidebar from "./components/Sidebar";
import Table from "./components/Table";
import Calendrier from "./pages/Calendrier";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import Test from "./pages/Test";
import Jour from "./pages/Jour";
import { DateContext } from "./utils/functions";
import Budgetisation from "./pages/Budgetisation";
import { sequelize } from "./backEnd/options";

export default function App() {
  useEffect(() => {
    sequelize.sync();
  }, []);

  const Stack = createNativeStackNavigator();
  const week = ["Date", "Dépenses", "Budget", "Reste", "Réintégré", "Épargné"];
  const content = [
    {
      Date: "05/08/2022",
      Total: 10,
      Budget: 10,
      Reste: 10,
      Réintégré: 10,
      Épargné: 10,
    },
    {
      Date: "06/08/2022",
      Total: 70,
      Budget: 10,
      Reste: 10,
      Réintégré: 10,
      Épargné: 10,
    },
    {
      Date: "07/08/2022",
      Total: 10,
      Budget: 10,
      Reste: 10,
      Réintégré: 10,
      Épargné: 10,
    },
  ];
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "transparent",
    },
  };
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [currentRoute, setCurrentRoute] = useState("");

  return (
    <DateContext.Provider
      value={[date, setDate, type, setType, currentRoute, setCurrentRoute]}
    >
      <NavigationContainer theme={navTheme}>
        <StatusBar style="light" />
        <Sidebar>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              options={{
                headerShown: false,
                cardStyle: {
                  backgroundColor: "transparent",
                },
              }}
              name="Home"
              component={Test}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                cardStyle: {
                  backgroundColor: "transparent",
                },
              }}
              name="Calendrier"
              component={Calendrier}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                cardStyle: {
                  backgroundColor: "transparent",
                },
              }}
              name="Budgetisation"
              component={Budgetisation}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                cardStyle: {
                  backgroundColor: "transparent",
                },
              }}
              name="depenses"
              component={Jour}
            />
          </Stack.Navigator>
        </Sidebar>
      </NavigationContainer>
    </DateContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
