import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { MainNavigationProps } from "../layout/main/MainLayout";

export default function AddScreen({ navigation }: MainNavigationProps) {
  return (
    <View style={styles.container}>
      <Text>Add Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  scrollContainer: {
    flex: 1,
    width: "100%",
  },
});
