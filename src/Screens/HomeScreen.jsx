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
        <Image source={require('../../assets/anaerobic-digester.png')} style={styles.coverImage} />
        <Text style={styles.sectionTitle}>Sheffield Hallam is one of very few UK universities to install a bio-digester in its catering facility to deal with food waste. </Text>
      </View>
      <View style={styles.section}>
        <Image source={require('../../assets/waste.jpg')} style={styles.coverImage} />
        <Text style={styles.sectionTitle}>Food waste in the UK · 6.6 million tonnes (70%) from households</Text>
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
