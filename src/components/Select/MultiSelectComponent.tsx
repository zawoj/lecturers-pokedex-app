import React, { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Button,
  StyleSheet,
} from "react-native";
import SimpleButton from "../Buttons/SimpleButton";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { COLORS } from "../../types/colors";

const MultiSelect = ({
  multi = false,
  options = [],
  title = "Select Options",
  setValue,
  name,
}: {
  multi?: boolean;
  title?: string;
  options: string[];
  setValue: UseFormSetValue<any>;
  name: string;
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    if (multi) {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter((item) => item !== option));
        setValue(
          name,
          selectedOptions.filter((item) => item !== option)
        );
      } else {
        setSelectedOptions([...selectedOptions, option]);
        setValue(name, [...selectedOptions, option]);
      }
    } else {
      setSelectedOptions([option]);
      setValue(name, [option]);
    }
  };

  return (
    <View
      style={{
        margin: 0,
        width: "100%",
        alignItems: "center"
      }}
    >
      <SimpleButton title={title} onPress={() => setIsOpen(true)} />
      <View style={styles.itemsContainer}>
        {selectedOptions.map((option, index) => (
          <Text key={index} style={styles.item}> {option} </Text>
        ))}</View>
      <Modal
        visible={isOpen}
        onRequestClose={() => setIsOpen(false)}
        transparent={true}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView style={{ flexGrow: 0 }}>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    handleSelect(option);
                    if (!multi) setIsOpen(false);
                  }}
                  style={{
                    alignItems: "center",
                    flex: 1,
                    padding: 10,
                    width: "100%",
                    marginVertical: 2,
                    borderRadius: 10,
                    backgroundColor: selectedOptions.includes(option)
                      ? COLORS.primary
                      : COLORS.disabled
                  }}
                >
                  <Text style={{ color: COLORS.text }}>{option}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            {multi && <SimpleButton title='Done' onPress={() => setIsOpen(false)} />}
          </View>
        </View>
      </Modal >
    </View >
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "80%",
    margin: 20,
    backgroundColor: COLORS.background,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: COLORS.textHeader,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  itemsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 5,
  },
  item: {
    padding: 5,
    margin: 3,
    backgroundColor: COLORS.primaryDark,
    borderRadius: 15,
    fontSize: 16,
    color: COLORS.text
  },
});

export default MultiSelect;
