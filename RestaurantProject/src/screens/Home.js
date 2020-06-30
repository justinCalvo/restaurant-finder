import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ProximitySearch from '../components/ProximitySearch';

const Home = ({ navigation }) => {
  return (
    <View>
      <ProximitySearch />
      <TouchableOpacity onPress={() => navigation.navigate('InputLocation')}>
        <Text>By City</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
