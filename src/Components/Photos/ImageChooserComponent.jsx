import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Image, View, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImageChooserComponent() {
  const [images, setImages] = useState([]); // State to hold multiple images

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImages([...images, result.assets[0].uri]); // Add new image to the array
    }
  };

  const handleDeleteImage = (index) => {
    const newImages = [...images]; // Create a copy of the images array
    newImages.splice(index, 1); // Remove the image at the specified index
    setImages(newImages); // Update the state with the new array of images
  };

  return (
    <ScrollView horizontal>
      <TouchableOpacity onPress={pickImage}>
        <Image source={require('./../../../assets/adaptive-icon.png')} style={{ width: 100, height: 100, borderRadius: 15, borderWidth: 1, borderColor: "black" }} />
      </TouchableOpacity>

      {images.map((uri, index) => (
        <View key={index} style={{ paddingLeft: 5, position: 'relative' }}>
          <Image source={{ uri }} style={{ width: 100, height: 100, borderRadius: 15, borderWidth: 1, borderColor: "black" }} />
          <TouchableOpacity
            onPress={() => handleDeleteImage(index)}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              padding: 5,
              borderRadius: 15,
            }}
          >
            <Text style={{ color: 'red', fontWeight: 'bold' }}>X</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}
