import { View, ScrollView, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getFirestore, query, where, getDocs } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import FoodInformation from "./../Components/Food Listing/Food-Information";
import { useFocusEffect } from '@react-navigation/native';

export default function MyListingsScreen() {
  const db = getFirestore(app);
  const { user } = useUser();
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    user && getUserListing();
  }, [user]);

  const getUserListing = async () => {
    setMyListings([]);
    setLoading(true);
    const q = query(collection(db, "listings"), where("userId", "==", user?.id));
    const snapshot = await getDocs(q);
    snapshot.forEach(doc => {
      setMyListings(myListings => [...myListings, doc.data()]);
      console.log(`${doc.id} => ${doc.data()}`);
    });
    setLoading(false);
  };

  return (
    <View className="flex-1">
      <View className="m-1">
        <ScrollView>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            myListings.length === 0 ? (
              <Text>No listings available</Text>
            ) : (
              <FoodInformation listings={myListings} />
            )
          )}
        </ScrollView>
      </View>
    </View>
  );
}
