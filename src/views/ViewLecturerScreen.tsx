import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  Dimensions,
  ScrollView,
  TextInput,
} from "react-native";
import { MainNavigationProps } from "../layout/main/MainLayout";
import * as Progress from "react-native-progress";
import { LecturerLevel, LecturerType } from "../types/lecturer";
import { LecturerContext, API_URL } from "../context/lecturer";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import { COLORS, GRADE_COLORS } from "../types/colors";
import { Colors } from "react-native/Libraries/NewAppScreen";


const LecturerLevelProgress = {
  [LecturerLevel.ENGINEER]: 0.25,
  [LecturerLevel.MASTER]: 0.5,
  [LecturerLevel.DOCTOR]: 0.75,
  [LecturerLevel.PROFESSOR]: 1,
};

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function ViewLecturerScreen({
  navigation,
}: MainNavigationProps) {
  const { lecturer } = useContext(LecturerContext);
  const { control, handleSubmit, setValue, reset } = useForm();
  const { getLecturer } = useContext(LecturerContext);

  if (lecturer == null) {
    return (
      <View style={{
        flex: 1,
        backgroundColor: COLORS.background,
      }}>
        <Text style={{ color: COLORS.text, }}>
          Wywaliło się przez nulla
        </Text>
      </View>

    )
  }

  const onSubmit = (data: any) => {
    console.log(data);

    axios.post(`${API_URL}/users/${lecturer._id}/comment`, data)
      .then((response) => {
        console.log(response);
        getLecturer(lecturer._id);
      })
      .catch((error) => console.log(error));

    setValue("comment", "");
  };
  // const lecturer: LecturerType = {
  //   _id: "1234",
  //   name: "Maciej Gębala",
  //   level: LecturerLevel.DOCTOR,
  //   image: "https://storage.googleapis.com/pokedex_photos/53f201ea-f6f1-11ed-abbc-833fa3c660ed.jpeg",
  //   description: "Jak jest doktor każdy widzi",
  //   classes: [],
  //   gradeDistribution: {
  //     s_2: 0,
  //     s_3: 0,
  //     s_3_5: 3,
  //     s_4: 2,
  //     s_4_5: 1,
  //     s_5: 0,
  //     s_5_5: 0,
  //   },
  //   comments: ["Testowy koment1", "Testowy koment2", "Testowy koment3"]
  // };

  const gradeDistributionItems = Object.keys(lecturer.gradeDistribution).map(key => {
    return { grade: key, value: lecturer.gradeDistribution[key] };
  });

  const totalValue = Math.max(gradeDistributionItems.reduce((acc, item) => acc + item.value, 0), 1);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: lecturer.image }} />
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContainerContent}
      >
        <Text style={styles.name}>{lecturer.name}</Text>
        <View style={styles.levelContainer}>
          <Progress.Bar
            style={styles.levelProgressBar}
            progress={LecturerLevelProgress[lecturer.level]}
            width={screenWidth * 0.9}
            height={20}
            color={COLORS.primary}
            unfilledColor={COLORS.surface}
            borderWidth={0}
            borderRadius={15}
          />
          <Text style={styles.levelText}>
            {lecturer.level}
          </Text>
        </View>

        <Text style={styles.description}>{lecturer.description}</Text>
        <Text style={styles.heading}>Classes</Text>
        <View style={styles.classes}>
          {lecturer.classes.map((item, index) => (
            <Text key={index} style={styles.classesItem}>
              {item}
            </Text>
          ))}
        </View>
        <Text style={styles.heading}>Grade Distribution</Text>
        <View>
          {gradeDistributionItems.map((item, index) => (
            <View key={index} style={styles.gradeRow}>
              <View style={styles.gradeBubble}>
                <Text style={styles.gradeText}>{item.grade.replace("s_", "").replace("_", ".")}</Text>
              </View>
              <Progress.Bar
                progress={item.value / totalValue}
                width={0.6 * screenWidth}
                height={10}
                color={GRADE_COLORS[index]}
                unfilledColor={COLORS.surface}
                borderWidth={0}
              />
            </View>
          ))}
        </View>
        {/* Add comment form */}
        <Text style={styles.heading}>Add comment</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder='Your comment'
              value={value}
              multiline={true}
              onChangeText={onChange}
              cursorColor={COLORS.secondaryDark}
              placeholderTextColor={COLORS.textHint}
              style={styles.textInputStyle}
              numberOfLines={4}
            />
          )}
          name='comment'
        />
        <View
          style={{
            width: "80%",
            margin: 10,
          }}
        >
          <Button title='Submit' color={COLORS.secondary} onPress={handleSubmit(onSubmit)} />
        </View>
        {/* Comments */}
        <Text style={styles.heading}>Comments</Text>
        <View>
          {lecturer.comments.map((item, index) => (
            <Text key={index} style={styles.comment}>
              {item}
            </Text>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  image: {
    width: screenWidth,
    height: screenHeight * 0.3, // jakieś skalowanie lepsze trzeba by zrobić
    // position: "absolute",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    zIndex: 999,
  },
  scrollContainer: {
    flex: 1,
    width: screenWidth,
  },
  scrollContainerContent: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    alignSelf: "center",
    color: COLORS.textHeader,
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
    alignSelf: "center",
    color: COLORS.text
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    alignSelf: "center",
    color: COLORS.textHeader,
  },
  gradeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  gradeBubble: {
    marginRight: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
    backgroundColor: COLORS.surface,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  gradeText: {
    color: COLORS.text,
    textAlign: "center",
  },
  textInputStyle: {
    width: "100%",
    height: 80,
    marginTop: 4,
    backgroundColor: COLORS.surface,
    color: COLORS.text,
    paddingHorizontal: 5,
  },
  comment: {
    backgroundColor: COLORS.surface,
    width: screenWidth * 0.9,
    paddingHorizontal: 5,
    paddingVertical: 10,
    margin: 5,
    color: COLORS.text,
    borderRadius: 15,
  },
  levelContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  levelProgressBar: {
    position: "absolute",
  },
  levelText: {
    position: "absolute",
    color: COLORS.text
  },
  classes: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  classesItem: {
    padding: 5,
    backgroundColor: COLORS.secondaryDark,
    borderRadius: 15,
    fontSize: 16,
    color: COLORS.text
  },
});
