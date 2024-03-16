import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getFirestore, query, where, getDocs } from 'firebase/firestore' // Added getDocs
import { app } from '../../firebaseConfig'
import { useUser } from '@clerk/clerk-expo'
import FoodInformation from "./../Components/Food Listing/Food-Information";

export default function MymyListingsScreen() {
  const db = getFirestore(app)
  const { user } = useUser()
  const [myListings, setmyListings]=useState(); 

  useEffect(() => {
    user && getUserListing()
  }, [user])

  const getUserListing = async () => {
    setmyListings([]);
    const q = query(collection(db, "myListings"), where("userId", "==", user?.id))
    const snapshot = await getDocs(q)
    snapshot.forEach(doc => {
      setmyListings(myListings =>[...myListings,doc.data()])
    })
  }

  return (
    <View className="flex-1">
    <View className="m-1">
      <ScrollView>
        <FoodInformation listings={myListings} />
      </ScrollView>
    </View>
  </View>
  )
}
