import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import ProximitySearch from '../../components/Landing/ProximitySearch';
import CityInput from './CityInput';
import Icon from 'react-native-vector-icons/Ionicons';

const Home = () => {
  const [toggleCitySearch, setToggleCitySearch] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Rair</Text>
      </View>
      <View style={styles.buttonContainer}>
        <ProximitySearch />
        <TouchableOpacity
          onPress={() => setToggleCitySearch(!toggleCitySearch)}>
          <Text style={styles.text}>
            <Icon name="search-sharp" size={24} /> Search Location
          </Text>
        </TouchableOpacity>
      </View>
      {toggleCitySearch ? <CityInput /> : null}
    </SafeAreaView>
  );
};
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    paddingVertical: 10,
    fontSize: 28,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 44,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  buttonContainer: {
    width: width,
    height: height / 3,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerContainer: {
    width: width,
    height: height / 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
