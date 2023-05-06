import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function CommonButton(props: {
  onPress: any;
  title: string;
  icon?: string;
  iconColor?: string;
  iconSize?: number;
  color?: string;
}) {
  const { onPress, title, icon } = props;
  return (
    <Pressable
      style={
        props.color
          ? [styles.button, { backgroundColor: props.color }]
          : styles.button
      }
      onPress={onPress}
    >
      {icon && (
        <Icon
          name={icon}
          color='white'
          size={props.iconSize ? props.iconSize : 24}
          style={
            props.iconColor
              ? [styles.icon, { color: props.iconColor }]
              : styles.icon
          }
        />
      )}
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#007AFF",
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  icon: {
    color: "white",
    marginRight: 10,
  },
});
