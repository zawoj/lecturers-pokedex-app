import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { MainNavigationProps } from "../layout/main/MainLayout";
import { useTheme } from "@react-navigation/native";

export default function AddScreen({ navigation }: MainNavigationProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={{ color: colors.text }}>Add Screen</Text>
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
