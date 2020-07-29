import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import ProximitySearch from '../../components/Landing/ProximitySearch';
import CityInput from './CityInput';

const Home = ({ navigation }) => {
  const [toggleCitySearch, setToggleCitySearch] = useState(false);
  console.log(toggleCitySearch);
  return (
    <View style={styles.container}>
      <ProximitySearch />
      <TouchableOpacity onPress={() => setToggleCitySearch(!toggleCitySearch)}>
        <Text style={styles.text}>Enter Location</Text>
      </TouchableOpacity>
      {toggleCitySearch ? <CityInput /> : null}
    </View>
  );
};
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
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
