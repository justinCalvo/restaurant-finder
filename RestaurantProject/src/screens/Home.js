import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ProximitySearch from '../components/ProximitySearch';

const Home = ({ navigation }) => {
  return (
    <View>
      <View>
        <ProximitySearch />
        <TouchableOpacity onPress={() => navigation.navigate('InputLocation')}>
          <Text>By City</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
