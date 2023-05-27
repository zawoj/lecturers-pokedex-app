import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";

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
    <View
      style={{
        flex: 1,
        alignItems: "stretch",
        justifyContent: "center",
        width: "100%",
        margin: 0,
      }}
    >
      <Button title='Pick an image' onPress={pickImage}/>
      {image && (
        <Image
          source={{ uri: image }}
          resizeMode="contain"
          style={{ width: '100%', height: undefined, aspectRatio: 1, margin: 10, alignSelf: "center" }}
        />
      )}
    </View>
  );
}
