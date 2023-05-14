import { FC } from "react";
import { Control, FieldValues } from "react-hook-form";
import { View, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";

interface Props {
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
  selectedOptions: string[];
  options: {
    label: string;
    value: string;
  }[];
  control: Control<FieldValues, any>;
}

const MultiSelectComponent: FC<Props> = (props) => {
  const { setSelectedOptions, options, selectedOptions } = props;
  const handleSelectOptions = (values: string) => {
    if (selectedOptions.length > 0) {
      if (selectedOptions.includes(values)) {
        setSelectedOptions(selectedOptions.filter((item) => item !== values));
        return;
      }
      setSelectedOptions([...selectedOptions, ...values]);
    } else {
      setSelectedOptions([values]);
    }
  };

  return (
    <View>
      {selectedOptions.map((item) => (
        <Text>{item}</Text>
      ))}
      <RNPickerSelect items={options} onValueChange={handleSelectOptions} />
    </View>
  );
};

export default MultiSelectComponent;
