import React, {useContext} from "react";
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
import { LecturerContext } from "../context/lecturer";


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
  const { lecturer } = useContext(LecturerContext);

  if(lecturer == null){
    return (
    <Text> Wywaliło się przez nulla</Text>
      )
  }

  const gradeDistributionItems = Object.keys(lecturer.gradeDistribution).map(key => {
    return { grade: key, value: lecturer.gradeDistribution[key] };
  });

  const totalValue = Math.max(gradeDistributionItems.reduce((acc, item) => acc + item.value, 0), 1);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: lecturer.image}} />
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContainerContent}
      >
        <View style={styles.spaceForImage} />
        <Text style={styles.name}>{lecturer.name}</Text>
        <Progress.Bar
          progress={LecturerLevelProgress[lecturer.level]}
          width={screenWidth * 0.9}
          height={10}
        />
        <Text style={styles.description}>{lecturer.description}</Text>
        <Text style={styles.heading}>Classes</Text>
        <View>
          {lecturer.classes.map((item, index) => (
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
