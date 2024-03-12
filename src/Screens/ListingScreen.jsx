import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ScrollView, Text } from 'react-native';
import FoodInformation from "./../Components/Food Listing/Food-Information";
import FoodHeader from "./../Components/Food Listing/Food-Header";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function ListingScreen() {
  const db = getFirestore(app);
  const [listings, setListings] = useState([]);

  const getListings = async () => {
    setListings([]);
    const querySnapshot = await getDocs(collection(db, "listings"));
    const newListings = [];
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      newListings.push(doc.data());
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
