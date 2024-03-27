import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function FoodInformation ({ listings }) {
  const navigation = useNavigation();

  const handlePress = (index) => {
    console.log("Index clicked:", index);
    navigation.push('Listing Info', { listinginfo: listings[index] })};

  return (
    <View style={styles.container}>
      {listings.map((listing, index) => (
        <TouchableOpacity key={index} onPress={() => handlePress(index)}>
          <View style={styles.rectangle}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: listing.images[0] }}
                style={styles.image}
              />
            </View>
            <View style={styles.textContainer}>
              <View>
                <Text style={styles.title}>{listing.title}</Text>
                <View style={styles.row}>
                  <Text style={styles.subtitle}>{listing.userFirstName} {listing.userLastName}</Text>
                  <Text>Rating PLACEhOLDER</Text>
                </View>
              </View>
              <View style={styles.row}>
                <Text style={styles.subtitle}>{listing.location}</Text>
                <Text style={styles.subtitle}>{listing.foodDateType}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  rectangle: {
    flexDirection: 'row',
    width: "95%",
    height: 115,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    marginBottom: 10, 
  },
  imageContainer: {
    flex: 1,
  },
  textContainer: {
    flex: 2,
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  subtitle: {
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
