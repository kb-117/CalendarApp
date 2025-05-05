import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // for icons
import CalendarScreen from "./screens/CalendarScreen";
import ConverterScreen from "./screens/ConverterScreen";
import AboutScreen from "./screens/AboutScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Calendar") {
              iconName = "calendar";
            } else if (route.name === "Converter") {
              iconName = "swap-horizontal";
            } else if (route.name === "About") {
              iconName = "information-circle";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Converter" component={ConverterScreen} />
        <Tab.Screen name="About" component={AboutScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
