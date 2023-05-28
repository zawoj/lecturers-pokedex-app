import React from "react";
import { Text, View, StyleSheet, Pressable, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from "../../types/colors";

const screenWidth = Dimensions.get("window").width;

export default function SimpleButton(props: {
    onPress: any;
    title: string;
    color?: string;
}) {
    const { onPress, title } = props;


    return (
        <Pressable
            style={
                props.color
                    ? [styles.button, { backgroundColor: props.color }]
                    : styles.button
            }
            onPress={onPress}
        >
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
        borderRadius: 10,
        elevation: 3,
        backgroundColor: COLORS.secondary,
        flexDirection: "row",
        width: screenWidth * 0.7,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: COLORS.text,
    },
});
