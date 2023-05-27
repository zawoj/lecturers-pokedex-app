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
      }}
    >
      <Button title={title} onPress={() => setIsOpen(true)} />
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <Text>Selected:</Text>
        {selectedOptions.map((option, index) => (
          <Text key={index}> {option} </Text>
        ))}
      </View>
      <Modal
        visible={isOpen}
        onRequestClose={() => setIsOpen(false)}
        transparent={true}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView style={{flexGrow:0}}>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    handleSelect(option);
                    if (!multi) setIsOpen(false);
                  }}
                  style={{
                    padding: 10,
                    backgroundColor: selectedOptions.includes(option)
                      ? "blue"
                      : "gray",
                  }}
                >
                  <Text style={{ color: "white" }}>{option}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            {multi && <Button title='Done' onPress={() => setIsOpen(false)} />}
          </View>
        </View>
      </Modal>
    </View>
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
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default MultiSelect;
