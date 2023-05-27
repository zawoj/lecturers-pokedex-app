import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Button,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { MainNavigationProps } from "../layout/main/MainLayout";
import { LecturerContext } from "../context/lecturer";
import { LecturerType, LecturerLevel } from "../types/lecturer";
import { COLORS } from "../types/colors";

export default function HomeScreen({ navigation }: MainNavigationProps) {
  const { lecturersList, getLecturer } = useContext(LecturerContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {lecturersList.map((item, index) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              getLecturer(item._id);
              navigation.navigate("viewLecturer");
            }}
            key={item._id}
          >
            <Image
              // @ts-ignore
              source={{ uri: item.image }}
              resizeMode='cover'
              style={styles.avatar}
            />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  avatar: {
    width: "100%",
    height: "80%",
  },
  card: {
    // borderWidth: 1,
    width: "48%",
    aspectRatio: 1,
    marginTop: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  textContainer: {
    backgroundColor: COLORS.surface,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    color: COLORS.text,
    fontWeight: "bold",
  },
});
