import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Rating = ({ rating, numReviews }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.star}>⭐</Text>
      <Text style={styles.rating}>{rating.toFixed(1)}</Text>
      <Text style={styles.reviews}>({numReviews} reviews)</Text>
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
