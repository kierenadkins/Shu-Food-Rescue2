import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { app } from '../../../firebaseConfig';



const Rating = ({ rating, numReviews }) => {
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const userId = "user_2dmQHShL1XRRWN0JQcQysJL8V3t"; // Specify the user ID you're interested in
  const db = getFirestore(app);

  useEffect(() => {
    const fetchUserReviews = async () => {
      const q = query(collection(db, "ratings"), where("userId", "==", userId));
      const snapshot = await getDocs(q);

      let reviewsArray = [];
      snapshot.forEach(doc => {
        reviewsArray.push(doc.data());
      });
      
      if (reviewsArray.length > 0) {
        const totalRating = reviewsArray.reduce((acc, review) => acc + review.ratingValue, 0);
        const avgRating = totalRating / reviewsArray.length;
        setAverageRating(avgRating);
        setReviewCount(reviewsArray.length);
      }
      else{
        setAverageRating(0);
        setReviewCount(0);
      }
    };

    fetchUserReviews();
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.star}>⭐</Text>
      <Text style={styles.rating}>{averageRating}</Text>
      <Text style={styles.reviews}>({reviewCount} reviews)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 10,
    marginRight: 5,
  },
  rating: {
    fontSize: 10,
    fontWeight: 'bold',
    marginRight: 5,
  },
  reviews: {
    fontSize: 7,
  },
});

export default Rating;
