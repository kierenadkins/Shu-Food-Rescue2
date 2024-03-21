import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ScrollView, Text } from 'react-native';
import FoodInformation from "./../Components/Food Listing/Food-Information";
import FoodHeader from "./../Components/Food Listing/Food-Header";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Constants from '../consts/consts';

export default function ListingScreen() {
  const db = getFirestore(app);
  const [listings, setListings] = useState([]);
  const [pageState, setPageState] = useState("Student Food");

  const getListings = async () => {
    setListings([]);
    const querySnapshot = await getDocs(collection(db, "listings"));
    const newListings = [];
    const today = new Date().toISOString();
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      
      const data = doc.data();

      if(data.foodDateType == "Use By"){
        const milliseconds = (data.foodDate.seconds * 1000) + (data.foodDate.nanoseconds / 1000000);
        const listingDate = new Date(milliseconds).toISOString();

        if (listingDate => today) {
          newListings.push(data);
        }
      }
      else{
        newListings.push(doc.data());
      }
    });
    setListings(newListings);
  }

  useFocusEffect(
    React.useCallback(() => {
      getListings();
    }, [])
  );

  useEffect(() => {
    getListings(); // Fetch data initially when component mounts
  }, []);

  return (
    <View style={{flex: 1}}>
      <View>
        <FoodHeader />
      </View>
      <View style={styles.contentContainer}>
        <ScrollView>
          <FoodInformation listings={listings} />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    margin: 10, 
  },
  innerContainer: {
    flex: 1,
  },
  padding: {
    height: 10, 
  },
});
