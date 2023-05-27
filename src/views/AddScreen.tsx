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
import ImagePickerComponent from "../components/ImagePicker/ImagePicker";

export default function AddScreen({ navigation }: MainNavigationProps) {
  const { control, handleSubmit, setValue, reset } = useForm();
  const { addLecturer, lecturersList } = useContext(LecturerContext);
  const onSubmit = (data: any) => {
    reset({
      name: null,
      level: null,
      classes: null,
      image: null,
      description: null,
      rating2: null,
      rating3: null,
      rating3_5: null,
      rating4: null,
      rating4_5: null,
      rating5: null,
      rating5_5: null,
    });
    data.image = data.image.uri;
    console.log(JSON.stringify(data));
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
                placeholder='Name'
                value={value}
                onChangeText={onChange}
                style={styles.textInputStyle}
              />
            )}
            name='name'
          />
        </View>

        <View style={styles.subcontainer}>
        {lecturesLevelOptions && (
          <MultiSelect
            options={lecturesLevelOptions}
            title='Level'
            setValue={setValue}
            name='level'
          />
        )}
        </View>

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

        <View style={styles.subcontainer}>
        {classesOptions && (
          <MultiSelect
            options={classesOptions}
            multi={true}
            title='Classes'
            setValue={setValue}
            name='classes'
          />
        )}
        </View>
        
        <View style={styles.subcontainer}>
        <Controller
          control={control}
          render={({ field: { onChange } }) => (
            <ImagePickerComponent onChange={onChange} />
          )}
          name='image'
        />
</View>

        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 30}}>Ratings:</Text>
        <View style={styles.subcontainer}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder='Rating 2'
                value={value}
                onChangeText={onChange}
                keyboardType='numeric'
                style={styles.textInputStyle}
              />
            )}
            name='rating2'
          />
        </View>
        <View style={styles.subcontainer}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder='Rating 3'
                value={value}
                onChangeText={onChange}
                keyboardType='numeric'
                style={styles.textInputStyle}
              />
            )}
            name='rating3'
          />
        </View>
        <View style={styles.subcontainer}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder='Rating 3.5'
                value={value}
                onChangeText={onChange}
                keyboardType='numeric'
                style={styles.textInputStyle}
              />
            )}
            name='rating3_5'
          />
        </View>
        <View style={styles.subcontainer}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder='Rating 4'
                value={value}
                onChangeText={onChange}
                keyboardType='numeric'
                style={styles.textInputStyle}
              />
            )}
            name='rating4'
          />
        </View>
        <View style={styles.subcontainer}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder='Rating 4.5'
                value={value}
                onChangeText={onChange}
                keyboardType='numeric'
                style={styles.textInputStyle}
              />
            )}
            name='rating4_5'
          />
        </View>
        <View style={styles.subcontainer}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder='Rating 5'
                value={value}
                onChangeText={onChange}
                keyboardType='numeric'
                style={styles.textInputStyle}
              />
            )}
            name='rating5'
          />
        </View>

        <View style={styles.subcontainer}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder='Rating 5.5'
                value={value}
                onChangeText={onChange}
                keyboardType='numeric'
                style={styles.textInputStyle}
              />
            )}
            name='rating5_5'
          />
        </View>

        <View
          style={{
            width: "80%",
            margin: 10,
          }}
        >
          <Button title='Submit' onPress={handleSubmit(onSubmit)} />
        </View>
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
    width: "100%",
    height: 40,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginTop: 4,
  },
});
