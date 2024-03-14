import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { collection, getFirestore, query, where, getDocs } from 'firebase/firestore' // Added getDocs
import { app } from '../../firebaseConfig'
import { useUser } from '@clerk/clerk-expo'

export default function MyListingsScreen() {
  const db = getFirestore(app)
  const { user } = useUser()

  useEffect(() => {
    user && getUserListing()
  }, [user])

  const getUserListing = async () => {
    const q = query(collection(db, "listings"), where("userId", "==", user?.id))
    const snapshot = await getDocs(q)
    snapshot.forEach(doc => {
      console.log(doc.data())
    })
  }

  return (
    <View>
      <Text>My Listing Screen</Text>
    </View>
  )
}
