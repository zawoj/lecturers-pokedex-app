import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import { MainNavigationProps } from "../layout/main/MainLayout";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Classes } from "../types/classes";
import MultiSelectComponent from "../components/Select/MultiSelectComponent";

export default function AddScreen({ navigation }: MainNavigationProps) {
  const { control, handleSubmit, setValue } = useForm();
  const onSubmit = (data: any) => console.log(data);

  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

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

  const options =
    Classes.map((item) => ({
      label: item.name,
      value: item.name,
    })) || [];

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput placeholder='ID' value={value} onChangeText={onChange} />
        )}
        name='id'
      />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput placeholder='Name' value={value} onChangeText={onChange} />
        )}
        name='name'
      />
      {/* <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <select value={value} onChange={onChange}>
            <option value={LecturerLevel.ENGINEER}>
              <Text>{LecturerLevel.ENGINEER}</Text>
            </option>
            <option value={LecturerLevel.MASTER}>
              <Text>{LecturerLevel.MASTER}</Text>
            </option>
            <option value={LecturerLevel.DOCTOR}>
              <Text>{LecturerLevel.DOCTOR}</Text>
            </option>
            <option value={LecturerLevel.PROFESSOR}>
              <Text>{LecturerLevel.PROFESSOR}</Text>
            </option>
          </select>
        )}
        name='level'
      /> */}
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder='Image URL'
            value={value}
            onChangeText={onChange}
          />
        )}
        name='image'
      />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder='Description'
            value={value}
            onChangeText={onChange}
          />
        )}
        name='description'
      />
      {/* <MultiSelectComponent
        setSelectedOptions={setSelectedOptions}
        control={control}
        options={options}
        selectedOptions={selectedOptions}
        key={selectedOptions.length}
      /> */}
      {["s_2", "s_2_5", "s_3", "s_3_5", "s_4", "s_4_5", "s_5", "s_5_5"].map(
        (grade, i) => (
          <Controller
            key={i}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder={grade}
                value={String(value)}
                onChangeText={(value) => onChange(Number(value))}
              />
            )}
            name={`gradeDistribution.${grade}`}
          />
        )
      )}
      <Button title='Submit' onPress={handleSubmit(onSubmit)} />
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
