import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { MainNavigationProps } from "../layout/main/MainLayout";
import * as Progress from "react-native-progress";
import { LecturerLevel, LecturerType } from "../types/lecturer";

const currentLecturer: LecturerType = {
  _id: "1234",
  name: "Maciej Gębala",
  level: LecturerLevel.DOCTOR,
  image: "https://storage.googleapis.com/pokedex_photos/53f201ea-f6f1-11ed-abbc-833fa3c660ed.jpeg",
  description: "Jak jest doktor każdy widzi",
  classes: [],
  gradeDistribution: {
    s_2: 0,
    s_3: 0,
    s_3_5: 0,
    s_4: 0,
    s_4_5: 0,
    s_5: 0,
    s_5_5: 0,
  },
};

const LecturerLevelProgress = {
  [LecturerLevel.ENGINEER]: 0.25,
  [LecturerLevel.MASTER]: 0.5,
  [LecturerLevel.DOCTOR]: 0.75,
  [LecturerLevel.PROFESSOR]: 1,
};

const screenWidth = Dimensions.get("window").width;

export default function ViewLecturerScreen({
  navigation,
}: MainNavigationProps) {

  const gradeDistributionItems = Object.keys(currentLecturer.gradeDistribution).map(key => {
    return { grade: key, value: currentLecturer.gradeDistribution[key] };
  });

  const totalValue = Math.max(gradeDistributionItems.reduce((acc, item) => acc + item.value, 0), 1);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: currentLecturer.image}} />
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContainerContent}
      >
        <View style={styles.spaceForImage} />
        <Text style={styles.name}>{currentLecturer.name}</Text>
        <Progress.Bar
          progress={LecturerLevelProgress[currentLecturer.level]}
          width={screenWidth * 0.9}
          height={10}
        />
        <Text style={styles.description}>{currentLecturer.description}</Text>
        <Text style={styles.heading}>Classes</Text>
        <View>
          {currentLecturer.classes.map((item, index) => (
            <Text key={index} style={styles.item}>
              {"\u2022 "}
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
            />
          </View>
        ))}
        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: screenWidth,
    height: screenWidth,
    position: "absolute",
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
  spaceForImage: {
    height: screenWidth,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    alignSelf: "center",
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
    alignSelf: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    alignSelf: "center",
  },
  item: {
    fontSize: 16,
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
    backgroundColor: "#eee",
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  gradeText: {
    textAlign: "center",
  },
});
