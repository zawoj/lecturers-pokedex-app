import { NavigationContainer } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import HomeScreen from "../../views/Home";
import AddScreen from "../../views/AddScreen";
import ProfileScreen from "../../views/Profile";

type RootStackParamList = {
  Lectures: undefined;
  AddLectures: undefined;
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
            headerTitle: "",
            tabBarIcon: ({ focused, color, size }) => {
              return <Ionicons name='home' size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name='Add Lectures'
          component={AddScreen}
          options={{
            headerTitle: "",
            tabBarIcon: ({ focused, color, size }) => {
              return <Ionicons name='add' size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name='Profile'
          component={ProfileScreen}
          options={{
            headerTitle: "",
            tabBarIcon: ({ focused, color, size }) => {
              return <AntDesign name='user' size={size} color={color} />;
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainLayout;
