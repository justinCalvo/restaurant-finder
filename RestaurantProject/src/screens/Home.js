import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ProximitySearch from '../components/ProximitySearch';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ProximitySearch />
      <TouchableOpacity onPress={() => navigation.navigate('InputLocation')}>
        <Text style={styles.text}>By City</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    paddingVertical: 10,
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default Home;
