import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import SimpleButton from "../Buttons/SimpleButton";
import { COLORS } from "../../types/colors";

export default function ImagePickerComponent({ onChange }: { onChange: any }) {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      onChange(result.assets[0]);
      // @ts-ignore
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <SimpleButton title='Pick an image' onPress={pickImage} />
      <View style={styles.surface}>
        {image && (
          <Image
            source={{ uri: image }}
            resizeMode="contain"
            style={styles.image}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    margin: 0,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  surface: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: COLORS.surface

  }
});
