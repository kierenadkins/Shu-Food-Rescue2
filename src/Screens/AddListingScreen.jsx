import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, KeyboardAvoidingView } from 'react-native';
import { app } from '../../firebaseConfig';
import { getFirestore, getDocs, collection, addDoc } from "firebase/firestore";
import { Formik } from 'formik';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker'
import LoadingComponent from '../Components/LoadingComponent';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useUser } from '@clerk/clerk-expo';
import Constants from '../consts/consts';
import { useFocusEffect } from '@react-navigation/native';

export default function AddFoodScreen() {
  const db = getFirestore(app);
  const storage = getStorage();
  const [locationList, setLocationList] = useState([]);
  const [dateTypeList, setDateTypeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [images, setImages] = useState([]); // State to hold multiple images
  const today = new Date();
  const {user} = useUser();

  useEffect(() => {
    const fetchData = async () => {
      await getLocationList();
      await getDateTypeList();
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setImages([])
    }, [])
  );

  const getLocationList = async () => {
    const querySnapshot = await getDocs(collection(db, "locations"));
    const locations = [];
    querySnapshot.forEach((doc) => {
      console.log(`Docs:`, doc.data());
      locations.push(doc.data());
    });
    setLocationList(locations);
  }

  const getDateTypeList = async () => {
    const querySnapshot = await getDocs(collection(db, "dates"));
    const dates = [];
    querySnapshot.forEach((doc) => {
      console.log(`Docs:`, doc.data());
      dates.push(doc.data());
    });
    setDateTypeList(dates);
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      multiple: true, // Enable multiple selection
    });
  
    if (!result.cancelled) {
      // Map through the selected images and extract their URIs
      const selectedImages = result.assets.map((asset) => asset.uri);
      setImages((prevImages) => [...prevImages, ...selectedImages]);
    }
  };

  const handleDeleteImage = (index) => {
    const newImages = [...images]; // Create a copy 
    newImages.splice(index, 1); // Remove the image 
    setImages(newImages); // Update the state 
  };

  const OnSubmitMethod = async (values) => {
    try {
      console.log("Submission started");
      setIsLoading(true);
  
      await Promise.all(images.map(async (image, i) => {
        try {
          console.log("Uploading imge: ", image);
          console.log("Uploading image: ", i);
  
          const resp = await fetch(image);
          if (!resp.ok) {
            throw new Error('Failed to fetch ');
          }
  
          const blob = await resp.blob();
          console.log("Image fetched and blob created for index: ", i);
  
          const uniqueId = Date.now() + "-" + i;
          console.log("Image Id ", uniqueId);

          const storageRef = ref(storage, 'listingPosts/' + uniqueId + ".jpg");
          console.log("Storage ref created for index: ", i);

          await uploadBytes(storageRef, blob);
          console.log("Image uploaded for index: ", i);
  
          const downloadUrl = await getDownloadURL(storageRef);
          console.log("Download URL obtained for index: ", i);
  
          values.images[i] = downloadUrl;
          console.log("Download URL stored in values for index: ", i);
        } catch (uploadError) {
          console.error("Error uploading image ", i, ": ", uploadError);
        }
      }));
  
      values.userFirstName = user.firstName;
      values.userLastName = user.lastName;
      values.userId = user.id;
      values.listingType = Constants.ListingType.Student.toString();
      values.status = Constants.ListingStatus.Active.toString();
      console.log("Setting additional values");
  
      const docRef = await addDoc(collection(db, "listings"), values);
      console.log("Document written with ID: ", docRef.id);
      setImages([]);
  
      Alert.alert("Success", "Your listing has been added successfully!");
    } catch (error) {
      console.error("Error uploading images or adding document: ", error);
      Alert.alert("Failure", "Something has gone wrong :(");
    } finally {
      setIsLoading(false);
      console.log("Submission completed");
    }
  };
  
  
  

  if (isLoading) {
    return (
      <LoadingComponent></LoadingComponent>
    );
  }

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <Formik
          initialValues={{ title: "", description: "", foodDateType: "", foodDate: new Date(), location: "", listingType: "", anonymous: false, images: [], userFirstName: "", userLastName: "", userId: "", status :"", createdAt: Date.now()  }}
          onSubmit={value => OnSubmitMethod(value)}
          validate={(values) => {
            const errors = {};
            if (!values.title) {
              errors.title = "Required"
            }
            if (!values.description) {
              errors.description = "Required"
            }
            if (!values.foodDateType ) {
              errors.foodDateType = "Required"
            }
            if (!values.location) {
              errors.location = "Required"
            }
            return errors;

          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View style={styles.formContainer}>

              <Text className="text-[20px] font-bold">Add new post</Text>
              <Text className="text-[15px] ">create a listing to start sharing food!</Text>
              
              <View style={styles.PhotoContainer}>
                <ScrollView horizontal>
                  <TouchableOpacity onPress={pickImage}>
                      <Image source={require('./../../assets/adaptive-icon.png')} style={{ width: 100, height: 100, borderRadius: 15, borderWidth: 1, borderColor: "black" }} />
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
              </View>
            
              <View>
                <Text>Title</Text>
                <TextInput
                  style={styles.input}
                  placeholder='Title'
                  value={values?.title}
                  onChangeText={handleChange('title')}
                />
                {errors.title && <Text style={styles.error}>{errors.title}</Text>}
              </View>
              <View>
                <Text>Description</Text>
                <TextInput
                  style={styles.input}
                  placeholder='Description'
                  value={values?.description}
                  numberOfLines={5}
                  onChangeText={handleChange('description')}
                />
                {errors.description && <Text style={styles.error}>{errors.description}</Text>}
              </View>
              <View>
                <Text>Food Date</Text>
                <RNPickerSelect
                  onValueChange={(value) => handleChange('foodDateType')(value)}
                  items={dateTypeList.map((item, index) => ({
                    key: index,
                    label: item.type,
                    value: item.type
                  }))}
                  placeholder={{
                    label: 'Food Date Type',
                    value: null
                  }}
                  style={pickerSelectStyles}
                />
                {errors.foodDateType && <Text style={styles.error}>{errors.foodDateType}</Text>}
                <DateTimePicker
                  value={values?.foodDate}
                  mode="date"
                  minimumDate={today}
                  dateFormat="dayofweek day month"
                  onChangeText={handleChange('foodDate')}
                />
              </View>
              <View>
                <Text>Location</Text>
                <RNPickerSelect
                  onValueChange={(value) => handleChange('location')(value)}
                  items={locationList.map((item, index) => ({
                    key: index,
                    label: item.name,
                    value: item.name
                  }))}
                  placeholder={{
                    label: 'Select a location',
                    value: null
                  }}
                  style={pickerSelectStyles}
                />
                {errors.location && <Text style={styles.error}>{errors.location}</Text>}
              </View>
              <TouchableOpacity onPress={handleSubmit} className="p-3 w-48 bg-white rounded-3xl border border-black mt-10 ">
                <Text className="text-black text-center text-[16px] ">Submit</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    margin: 20,
    borderRadius: 10,
  },

  PhotoContainer: {
    height: 150,
    borderWidth: 1,
    borderColor: 'black',
    padding: 20,
    borderRadius: 10,
    alignContent: 'center',
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
});


const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginBottom: 10,
    marginTop: 10
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginBottom: 10,
    marginTop: 10
  },
});