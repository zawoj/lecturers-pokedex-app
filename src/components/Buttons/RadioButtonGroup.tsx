import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface Option {
  value: string;
  label: string;
}

interface RadioButtonGroupProps {
  options: Option[];
  selectedValue: string;
  onValueChange: (newValue: string) => void;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = (props) => {
  const { options, selectedValue, onValueChange } = props;
  const [value, setValue] = useState<string>(selectedValue);

  const handlePress = (newValue: string) => {
    setValue(newValue);
    onValueChange(newValue);
  };

  return (
    <View>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={styles.radioButtonContainer}
          onPress={() => handlePress(option.value)}
        >
          <Text style={styles.radioButtonLabel}>{option.label}</Text>
          <Ionicons
            name={
              value === option.value ? "radio-button-on" : "radio-button-off"
            }
            size={24}
            color='blue' // customize the color of the radio button
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    minHeight: 30,
  },
  radioButtonLabel: {
    marginRight: 10,
    fontSize: 16,
  },
});

export default RadioButtonGroup;
