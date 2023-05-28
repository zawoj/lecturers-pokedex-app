import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { COLORS } from "../../types/colors";


export default function SimpleTextInput(props: {
    value: any,
    placeholder: string,
    multiline?: boolean,
    keyboardType?: any,
    onChangeText: (...event: any[]) => void
}) {
    const { value, placeholder, multiline, onChangeText, keyboardType } = props;

    if (multiline) {
        return (<TextInput
            placeholder={placeholder}
            value={value}
            multiline={true}
            onChangeText={onChangeText}
            cursorColor={COLORS.secondaryDark}
            placeholderTextColor={COLORS.textHint}
            style={styles.multiline}
            numberOfLines={4}
            keyboardType={keyboardType}
        />)
    } else {
        return (<TextInput
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            cursorColor={COLORS.secondaryDark}
            placeholderTextColor={COLORS.textHint}
            style={styles.singleline}
            keyboardType={keyboardType}
        />)
    }
}

const styles = StyleSheet.create({
    multiline: {
        width: "100%",
        height: 80,
        marginVertical: 10,
        backgroundColor: COLORS.surface,
        color: COLORS.text,
        paddingHorizontal: 5,
        borderRadius: 10
    },
    singleline: {
        width: "100%",
        height: 40,
        marginVertical: 10,
        backgroundColor: COLORS.surface,
        color: COLORS.text,
        paddingHorizontal: 5,
        borderRadius: 10
    }
})