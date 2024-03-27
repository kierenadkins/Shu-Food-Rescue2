import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';

const HomePage = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Help us make a diffrence!</Text>
      <View style={styles.section}>
        <Image source={require('../../assets/food-waste.png')} style={styles.coverImage} />
        <Text style={styles.sectionTitle}>Did you know that 1/3 of all food within the world is wasted per year</Text>
      </View>
      <View style={styles.section}>
        <Image source={require('../../assets/shu-logo.jpg')} style={styles.coverImage} />
        <Text style={styles.sectionTitle}>Featured Products</Text>
      </View>
      <View style={styles.section}>
        <Image source={require('../../assets/shu-logo.jpg')} style={styles.coverImage} />
        <Text style={styles.sectionTitle}>About Us</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 20,
  },
  coverImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  sectionTitle: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default HomePage;
