import { NavigationContainer } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import HomeScreen from "../../views/Home";

type RootStackParamList = {
  Home: undefined;
};

export type MainNavigationProps = NativeStackScreenProps<RootStackParamList>;
const Tab = createBottomTabNavigator();

const MainLayout = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          options={{
            headerTitle: "Home Screen",
            tabBarIcon: ({ focused, color, size }) => {
              return <Icon name='home' size={size} color={color} />;
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainLayout;
