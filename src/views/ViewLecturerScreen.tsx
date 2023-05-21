import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  StatusBar,
} from "react-native";
import { MainNavigationProps } from "../layout/main/MainLayout";
import * as Progress from "react-native-progress";
import { LecturerContext } from "../context/lecturer";

const lecturerName = "Lecturer Name";
const lecturerExperience = 0.9;
const dataItems = ["Item1", "Item2", "Item3", "Item4"];
const gradesDistribution = [
  { grade: 2, value: 0.3 },
  { grade: 3, value: 0.5 },
  { grade: 3.5, value: 0.7 },
  { grade: 4, value: 0.8 },
  { grade: 4.5, value: 0.9 },
  { grade: 5, value: 1 },
  { grade: 5.5, value: 0.6 },
];

const screenWidth = Dimensions.get("window").width;
const imageUrl = "../../assets/gebala_portret.jpg";

export default function ViewLecturerScreen({
  navigation,
}: MainNavigationProps) {
  const { lecturer } = useContext(LecturerContext);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require(imageUrl)} />
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContainerContent}
      >
        <View style={styles.spaceForImage} />
        <Text style={styles.name}>{lecturerName}</Text>
        <Progress.Bar
          progress={lecturerExperience}
          width={screenWidth * 0.9}
          height={10}
        />
        <Text style={styles.heading}>Item List</Text>
        <View>
          {dataItems.map((item) => (
            <Text key={item} style={styles.item}>
              {"\u2022 "}
              {item}
            </Text>
          ))}
        </View>
        <Text style={styles.heading}>Grade Distribution</Text>
        <View>
          {gradesDistribution.map((item) => (
            <View key={item.grade} style={styles.gradeRow}>
              <View style={styles.gradeBubble}>
                <Text style={styles.gradeText}>{item.grade}</Text>
              </View>
              <Progress.Bar
                progress={item.value}
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
