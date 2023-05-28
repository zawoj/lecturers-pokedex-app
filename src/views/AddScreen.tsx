import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { MainNavigationProps } from "../layout/main/MainLayout";
import React, { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Classes } from "../types/classes";
import { LecturerLevel, LecturerType } from "../types/lecturer";
import MultiSelect from "../components/Select/MultiSelectComponent";
import { LecturerContext } from "../context/lecturer";
import ImagePickerComponent from "../components/ImagePicker/ImagePicker";
import { COLORS } from "../types/colors";
import SimpleTextInput from "../components/TextInput/SimpleTextInput";
import SimpleButton from "../components/Buttons/SimpleButton";

function isNumber(n: any) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }


export default function AddScreen({ navigation }: MainNavigationProps) {
  const [dummestCounterEver, setDummestCounter] = useState<number>(5); // do not touch !!!
  const { control, handleSubmit, setValue, reset } = useForm();
  const { addLecturer, lecturersList } = useContext(LecturerContext);

  const onSubmit = (data: any) => {
    if (data.name == null || data.name == "") {
      ToastAndroid.show("Lecturers name can't be empty", ToastAndroid.SHORT);
      return;
    }

    if (data.level == null) {
      ToastAndroid.show("Plase select lecturers level", ToastAndroid.SHORT)
      return;
    }

    if (data.classes == null || data.classes.length === 0) {
      ToastAndroid.show("Please select at least one class", ToastAndroid.SHORT)
      return;
    }

    if (data.description == null || data.description == "") {
      ToastAndroid.show("Please provide a description", ToastAndroid.SHORT);
      return;
    }

    if (data.rating2 == null || !isNumber(data.rating2)) {
      ToastAndroid.show("Please update grades", ToastAndroid.SHORT);
      return;
    }

    if (data.rating3 == null || !isNumber(data.rating3)) {
      ToastAndroid.show("Please update grades", ToastAndroid.SHORT);
      return;
    }

    if (data.rating3_5 == null || !isNumber(data.rating3_5)) {
      ToastAndroid.show("Please update grades", ToastAndroid.SHORT);
      return;
    }

    if (data.rating4 == null || !isNumber(data.rating4)) {
      ToastAndroid.show("Please update grades", ToastAndroid.SHORT);
      return;
    }

    if (data.rating4_5 == null || !isNumber(data.rating4_5)) {
      ToastAndroid.show("Please update grades", ToastAndroid.SHORT);
      return;
    }

    if (data.rating5 == null || !isNumber(data.rating5)) {
      ToastAndroid.show("Please update grades", ToastAndroid.SHORT);
      return;
    }


    if (data.rating5_5 == null || !isNumber(data.rating5_5)) {
      ToastAndroid.show("Please update grades", ToastAndroid.SHORT);
      return;
    }

    if (data.image == null) {
      ToastAndroid.show("Please select lecturers image", ToastAndroid.SHORT)
      return;
    }

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
    setDummestCounter(dummestCounterEver + 1);

    const lecturer: LecturerType = {
      _id: "-1",
      name: data.name,
      level: data.level,
      image: data.image.uri,
      description: data.description ? data.description : "",
      classes: data.classes ? data.classes : [],
      gradeDistribution: {
        s_2: data.rating2 ? parseInt(data.rating2) : 0,
        s_3: data.rating3 ? parseInt(data.rating3) : 0,
        s_3_5: data.rating3_5 ? parseInt(data.rating3_5) : 0,
        s_4: data.rating4 ? parseInt(data.rating4) : 0,
        s_4_5: data.rating4_5 ? parseInt(data.rating4_5) : 0,
        s_5: data.rating5 ? parseInt(data.rating5) : 0,
        s_5_5: data.rating5_5 ? parseInt(data.rating5_5) : 0,
      },
      comments: [],
    };

    console.log(JSON.stringify(lecturer));
    addLecturer(lecturer);
    navigation.navigate("Lectures");
  };

  const classesOptions: string[] = Classes.map((item) => item.name);
  const lecturesLevelOptions: string[] = Object.values(LecturerLevel);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>Name:</Text>
        <View style={styles.subcontainer}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <SimpleTextInput
                placeholder='Enter name...'
                value={value}
                onChangeText={onChange}
              />
            )}
            name='name'
          />
        </View>

        <Text style={styles.heading}>Level:</Text>
        <View style={styles.subcontainer}>
          {lecturesLevelOptions && (
            <MultiSelect
              options={lecturesLevelOptions}
              title='Select Level'
              setValue={setValue}
              name='level'
              key={3 * dummestCounterEver + 2}
            />
          )}
        </View>

        <Text style={styles.heading}>Description:</Text>
        <View style={styles.subcontainer}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <SimpleTextInput
                placeholder='Your description...'
                value={value}
                onChangeText={onChange}
                multiline={true}
              />
            )}
            name='description'
          />
        </View>

        <Text style={styles.heading}>Classes:</Text>
        <View style={styles.subcontainer}>
          {classesOptions && (
            <MultiSelect
              options={classesOptions}
              multi={true}
              title='Select Classes'
              setValue={setValue}
              name='classes'
              key={3 * dummestCounterEver + 1}
            />
          )}
        </View>

        <Text style={styles.heading}>Image:</Text>
        <View style={styles.subcontainer}>
          <Controller
            control={control}
            render={({ field: { onChange } }) => (
              <ImagePickerComponent onChange={onChange} key={3 * dummestCounterEver} />
            )}
            name='image'
          />
        </View>

        <Text style={styles.heading}>Grade distribution:</Text>
        <View style={styles.subcontainer}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <SimpleTextInput
                placeholder="number of 2's"
                value={value}
                onChangeText={onChange}
                keyboardType='numeric'
              />
            )}
            name='rating2'
          />
        </View>
        <View style={styles.subcontainer}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <SimpleTextInput
                placeholder="number of 3's"
                value={value}
                onChangeText={onChange}
                keyboardType='numeric'
              />
            )}
            name='rating3'
          />
        </View>
        <View style={styles.subcontainer}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <SimpleTextInput
                placeholder="number of 3.5's"
                value={value}
                onChangeText={onChange}
                keyboardType='numeric'
              />
            )}
            name='rating3_5'
          />
        </View>
        <View style={styles.subcontainer}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <SimpleTextInput
                placeholder="number of 4's"
                value={value}
                onChangeText={onChange}
                keyboardType='numeric'
              />
            )}
            name='rating4'
          />
        </View>
        <View style={styles.subcontainer}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <SimpleTextInput
                placeholder="number of 4.5's"
                value={value}
                onChangeText={onChange}
                keyboardType='numeric'
              />
            )}
            name='rating4_5'
          />
        </View>
        <View style={styles.subcontainer}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <SimpleTextInput
                placeholder="number of 5's"
                value={value}
                onChangeText={onChange}
                keyboardType='numeric'
              />
            )}
            name='rating5'
          />
        </View>

        <View style={styles.subcontainer}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <SimpleTextInput
                placeholder="number of 5.5's"
                value={value}
                onChangeText={onChange}
                keyboardType='numeric'
              />
            )}
            name='rating5_5'
          />
        </View>

        <SimpleButton title='Submit' onPress={handleSubmit(onSubmit)} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.background,
    paddingBottom: 20,
  },
  subcontainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 5,
    color: COLORS.textHeader,
  },
});
