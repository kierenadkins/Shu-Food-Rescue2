import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NavigationHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('Food')}>
        <Text style={styles.headerText}>Student Food</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
        <Text style={styles.headerTextWithPadding}>Cafe's Food</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: '#BA0047',
    borderBottomWidth: 5,
  },
  headerText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 3,
  },
  headerTextWithPadding: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 20,
  },
});

export default NavigationHeader;
