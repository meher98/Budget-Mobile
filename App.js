import { StatusBar } from "expo-status-bar";
import Sidebar from "./components/Sidebar";
import Calendrier from "./pages/Calendrier";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useCallback, useEffect, useState } from "react";
import Test from "./pages/Test";
import Jour from "./pages/Jour";
import { DateContext } from "./utils/functions";
import Budgetisation from "./pages/Budgetisation";
import { sequelize } from "./backEnd/options";
import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    UbuntuBold: require("./fonts/Ubuntu/Ubuntu-Bold.ttf"),
    Ubuntu: require("./fonts/Ubuntu/Ubuntu-Regular.ttf"),
  });

  useEffect(() => {
    sequelize.sync({ force: true });
    // if (fontsLoaded) {
    //   await SplashScreen.hideAsync();
    // }
  }, [fontsLoaded]);

  const Stack = createNativeStackNavigator();

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
  if (!fontsLoaded) {
    return null;
  }
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
