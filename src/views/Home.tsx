import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { MainNavigationProps } from "../layout/main/MainLayout";

export default function HomeScreen({ navigation }: MainNavigationProps) {
  return <ScrollView contentContainerStyle={styles.container}></ScrollView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flex: 1,
    flexDirection: "row",
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
