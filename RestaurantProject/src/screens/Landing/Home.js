import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ProximitySearch from '../../components/Landing/ProximitySearch';
import CitySearch from '../../components/Landing/CitySearch';
import Icon from 'react-native-vector-icons/Ionicons';

const Home = () => {
  const [toggleCitySearch, setToggleCitySearch] = useState(false);

  return (
    <KeyboardAwareScrollView
      style={styles.keyboardColor}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}>
      <View style={styles.buttonContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Rair</Text>
        </View>
        <ProximitySearch />
        <TouchableOpacity
          onPress={() => setToggleCitySearch(!toggleCitySearch)}>
          <Text style={styles.text}>
            <Icon name="search-sharp" size={24} /> Search Location
          </Text>
        </TouchableOpacity>
      </View>
      {toggleCitySearch ? <CitySearch /> : null}
    </KeyboardAwareScrollView>
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
    height: height / 1.5,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerContainer: {
    width: width,
    height: height / 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardColor: {
    backgroundColor: 'white',
  },
});

export default Home;
