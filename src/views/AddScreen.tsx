import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import { MainNavigationProps } from "../layout/main/MainLayout";
import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { Classes } from "../types/classes";
import { LecturerLevel } from "../types/lecturer";
import MultiSelect from "../components/Select/MultiSelectComponent";
import { LecturerContext } from "../context/lecturer";

export default function AddScreen({ navigation }: MainNavigationProps) {
  const { control, handleSubmit, setValue, reset } = useForm();
  const { addLecturer, lecturersList } = useContext(LecturerContext);
  const onSubmit = (data: any) => {
    reset();
    addLecturer(data);
    navigation.navigate("Lectures");
  };

  const classesOptions: string[] = Classes.map((item) => item.name);

  const lecturesLevelOptions: string[] = Object.values(LecturerLevel);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.subcontainer}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder='ID'
                value={value}
                onChangeText={onChange}
                style={styles.textInputStyle}
              />
            )}
            name='id'
          />
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder='Name'
                value={value}
                onChangeText={onChange}
                style={styles.textInputStyle}
              />
            )}
            name='name'
          />
        </View>

        {lecturesLevelOptions && (
          <MultiSelect options={lecturesLevelOptions} title='Level' />
        )}

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder='Image URL'
              value={value}
              onChangeText={onChange}
              style={{
                ...styles.textInputStyle,
                width: "80%",
              }}
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
              style={{
                ...styles.textInputStyle,
                width: "80%",
              }}
              multiline={true}
              numberOfLines={4}
              maxLength={80}
            />
          )}
          name='description'
        />
        {classesOptions && (
          <MultiSelect options={classesOptions} multi={true} title='Classes' />
        )}

        {["2", "3", "3.5", "4", "4.5", "5", "5.5"].map((item, index) => (
          <Controller
            key={index}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder={`Rating ${item}`}
                value={value}
                onChangeText={onChange}
                style={{
                  ...styles.textInputStyle,
                  width: "80%",
                }}
                keyboardType='numeric'
              />
            )}
            name={`rating${item}`}
          />
        ))}

        <Button title='Submit' onPress={handleSubmit(onSubmit)} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  subcontainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  scrollContainer: {
    flex: 1,
    width: "100%",
  },
  textInputStyle: {
    width: "49%",
    height: 40,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    margin: 8,
  },
});
