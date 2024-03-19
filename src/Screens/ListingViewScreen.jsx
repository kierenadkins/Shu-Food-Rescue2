import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '@clerk/clerk-expo';
import { collection, deleteDoc, getFirestore, query, where, getDocs } from 'firebase/firestore'; // Added missing imports
import { app } from '../../firebaseConfig';

export default function ListingViewScreen() {
  const { params } = useRoute();
  const { user } = useUser();
  const navigation = useNavigation();
  const db = getFirestore(app);

  useEffect(() => {
    console.log(params);
  }, []);

  const handleSubmit = () => {
    // Define your handleSubmit function logic here
  };

  const deleteUserPost = () => {
    Alert.alert("Do you want to delete?", "Are you sure?", [
      {
        text: "yes",
        onPress: () => deleteFromDatabase()
      },
      {
        text: "no",
        style: 'cancel',
      }
    ])
  };

  const deleteFromDatabase = async () => {
    const q = query(collection(db, "listings"), where("title", "==", params.listinginfo.title));
    const snapshot = await getDocs(q);

    snapshot.forEach(doc => {
      deleteDoc(doc.ref).then(resp => {
        console.log("Deleted");
        navigation.goBack();
      }).catch(error => {
        console.error("Error deleting document: ", error); // Handle error if delete operation fails
      });
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.formContainer}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: "center", padding: 1 }}>{params.listinginfo.title}</Text>

          <View style={styles.photoContainer}>
            <ScrollView horizontal>
              {/* Assuming 'listinginfo' is defined */}
              {params.listinginfo.images.map((uri, index) => (
                <View key={index} style={{ flexDirection: 'row', justifyContent: 'center', position: 'relative' }}>
                  <Image source={{ uri }} style={{ width: 125, height: "90%", borderRadius: 15, borderWidth: 1, borderColor: "black" }} />
                </View>
              ))}
            </ScrollView>
          </View>
          <View>
            <Text>{params.listinginfo.description}</Text>
          </View>
          <View>
            <Text>Food Date</Text>

          </View>
          <View>
            <Text>Location</Text>
          </View>

          {user?.id == params.listinginfo.userId ? (
            <TouchableOpacity onPress={deleteUserPost} style={styles.deleteButton}>
              <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>Delete</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={{ color: 'black', textAlign: 'center', fontSize: 16 }}>Reserve</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
    width: '90%',
    height: '98%',
    padding: 10,
  },
  formContainer: {
    flex: 1,
    borderRadius: 10,
  },
  photoContainer: {
    height: "25%",
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    padding: 13,
    width: 150,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 10,
    alignSelf: 'center',
  },

  deleteButton: {
    padding: 13,
    width: 150,
    backgroundColor: 'red',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'red',
    marginTop: 10,
    alignSelf: 'center',
  },
});
