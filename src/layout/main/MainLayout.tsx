import {
  NavigationContainer,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../../views/Home";
import ViewLecturerScreen from "../../views/ViewLecturerScreen";
import AddScreen from "../../views/AddScreen";
import { COLORS } from "../../types/colors";
import { LecturerContext } from "../../context/lecturer";

type RootStackParamList = {
  Lectures: undefined;
  viewLecturer: undefined;
  addLectures: undefined;
  Profile: undefined;
};

export type MainNavigationProps = NativeStackScreenProps<RootStackParamList>;
const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarStyle: {
    backgroundColor: COLORS.tabBar,
    borderTopWidth: 0,
  },
  tabBarItemStyle: {
    marginBottom: 2,
  }
};

const MainLayout = () => {
  const { lecturer } = useContext(LecturerContext);

  return (
    <NavigationContainer>
      <Tab.Navigator {...{ screenOptions }}>
        <Tab.Screen
          name='Lectures'
          component={HomeScreen}
          options={{
            title: "Lecturers",
            tabBarActiveTintColor: COLORS.primaryLight,
            tabBarInactiveTintColor: COLORS.text,
            headerStyle: { backgroundColor: COLORS.tabBar },
            headerTintColor: COLORS.text,
            tabBarIcon: ({ focused, color, size }) => {
              return <Ionicons name='home' size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name='viewLecturer'
          component={ViewLecturerScreen}
          listeners={{
            tabPress: e => {
              // Prevent default action
              if (lecturer == null) {
                e.preventDefault();
              }
            },
          }}
          options={{
            title: "View Lecturer",
            tabBarActiveTintColor: COLORS.primaryLight,
            tabBarInactiveTintColor: COLORS.text,
            headerTintColor: COLORS.text,
            tabBarLabelStyle: (lecturer == null) ? {
              color: COLORS.disabled
            } : {},
            headerStyle: {
              height: StatusBar.currentHeight,
              backgroundColor: COLORS.tabBar
            },
            tabBarIcon: ({ focused, color, size }) => {
              return <Ionicons name='beer' size={size} color={(lecturer == null) ? COLORS.disabled : color} />;
            },
          }}
        />
        <Tab.Screen
          name='addLectures'
          component={AddScreen}
          options={{
            title: "Add Lecturer",
            tabBarActiveTintColor: COLORS.primaryLight,
            tabBarInactiveTintColor: COLORS.text,
            headerTintColor: COLORS.text,
            headerStyle: {
              backgroundColor: COLORS.tabBar
            },
            tabBarIcon: ({ focused, color, size }) => {
              return <Ionicons name='add' size={size} color={color} />;
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer >
  );
};

export default MainLayout;
