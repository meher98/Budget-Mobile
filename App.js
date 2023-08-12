import { StatusBar } from "expo-status-bar";
import Sidebar from "./components/Sidebar";
import Calendrier from "./pages/Calendrier";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import Test from "./pages/Test";
import Jour from "./pages/Jour";
import { DateContext } from "./utils/functions";
import Budgetisation from "./pages/Budgetisation";
import { sequelize } from "./backEnd/options";
import { useFonts } from "expo-font";
import * as LocalAuthentication from "expo-local-authentication";
import Login from "./pages/Login";
import { AppState } from "react-native";
// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

export default function App() {
  const [auth, setAuth] = useState(false);
  const onFaceId = async () => {
    try {
      // Checking if device is compatible
      const isCompatible = await LocalAuthentication.hasHardwareAsync();

      if (!isCompatible) {
        throw new Error("Your device isn't compatible.");
      }

      // Checking if device has biometrics records
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!isEnrolled) {
        throw new Error("No Faces / Fingers found.");
      }

      // Authenticate user
      let success = await LocalAuthentication.authenticateAsync();
      setAuth(success.success);
    } catch (error) {
      console.log("An error as occured", error?.message);
    }
  };
  const [fontsLoaded] = useFonts({
    UbuntuBold: require("./fonts/Ubuntu/Ubuntu-Bold.ttf"),
    Ubuntu: require("./fonts/Ubuntu/Ubuntu-Regular.ttf"),
  });
  const appState = useRef(AppState.currentState);
  useEffect(() => {
    sequelize.sync({ force: true });
    // sequelize.sync();
    // if (fontsLoaded) {
    //   await SplashScreen.hideAsync();
    // }

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (appState.current.match(/inactive|background/)) {
        setAuth(false);
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
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
        {!auth ? (
          <Login onPress={() => onFaceId()} />
        ) : (
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
              {/* <Stack.Screen
              options={{
                headerShown: false,
                cardStyle: {
                  backgroundColor: "transparent",
                },
              }}
              name="Budgetisation"
              component={Budgetisation}
            /> */}
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
        )}
      </NavigationContainer>
    </DateContext.Provider>
  );
}
