import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator
    initialRouteName="Movies"
    screenOptions={{
      tabBarActiveTintColor: "red",
      tabBarLabelStyle: {
        marginTop: -5,
        fontSize: 12,
        fontWeight: "600",
      },
    }}
  >
    <Tab.Screen
      name="Movis"
      component={Movies}
      options={{
        tabBarIcon: ({ color, size }) => {
          return <Ionicons name="film-outline" color={color} size={size} />;
        },
      }}
    />
    <Tab.Screen
      name="Tv"
      component={Tv}
      options={{
        tabBarIcon: ({ color, size }) => {
          return <Ionicons name="tv-outline" color={color} size={size} />;
        },
      }}
    />
    <Tab.Screen
      name="Search"
      component={Search}
      options={{
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              color={color}
              size={size}
            />
          );
        },
      }}
    />
  </Tab.Navigator>
);

export default Tabs;
