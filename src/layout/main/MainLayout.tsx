import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useTheme,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { useColorScheme } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import HomeScreen from "../../views/Home";
import ViewLecturerScreen from "../../views/ViewLecturerScreen";
import AddScreen from "../../views/AddScreen";

type RootStackParamList = {
  Lectures: undefined;
  viewLecturer: undefined;
  addLectures: undefined;
  Profile: undefined;
};

export type MainNavigationProps = NativeStackScreenProps<RootStackParamList>;
const Tab = createBottomTabNavigator();

const MainLayout = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name='Lectures'
          component={HomeScreen}
          options={{
            headerTitle: "Lectures",
            tabBarIcon: ({ focused, color, size }) => {
              return <Ionicons name='home' size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name='viewLecturer'
          component={ViewLecturerScreen}
          options={{
            headerTitle: "View Lecturer",
            headerStyle: {
              height: StatusBar.currentHeight,
            },
            tabBarIcon: ({ focused, color, size }) => {
              return <Ionicons name='beer' size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name='addLectures'
          component={AddScreen}
          options={{
            headerTitle: "Add Lectures",
            tabBarIcon: ({ focused, color, size }) => {
              return <Ionicons name='add' size={size} color={color} />;
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainLayout;
