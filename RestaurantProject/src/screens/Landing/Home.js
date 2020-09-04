import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';

import ProximitySearch from '../../components/Landing/ProximitySearch';
import CitySearch from '../../components/Landing/CitySearch';
import Loading from '../../components/Loading/Loading';

import PreferencesScreen from './PreferencesScreen';

const Home = () => {
  const [toggleCitySearch, setToggleCitySearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(4);
  const [meters, setMeters] = useState('8046.72');

  return (
    <KeyboardAwareScrollView
      style={styles.keyboardColor}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
      extraScrollHeight={20}>
      <View style={styles.buttonContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Rair</Text>
        </View>
        {isLoading ? <Loading /> : null}
        <PreferencesScreen
          min={min}
          setMin={setMin}
          max={max}
          setMax={setMax}
          setMeters={setMeters}
        />
        <ProximitySearch
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          min={min}
          max={max}
          meters={meters}
        />
        <TouchableOpacity
          onPress={() => setToggleCitySearch(!toggleCitySearch)}>
          <Text style={styles.text}>
            <Icon name="search-sharp" size={24} color="#cb3737" /> Search
            Location
          </Text>
        </TouchableOpacity>
      </View>
      {toggleCitySearch ? (
        <CitySearch
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          min={min}
          max={max}
          meters={meters}
        />
      ) : null}
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
    backgroundColor: '#fafafa',
  },
  text: {
    paddingVertical: 10,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C2938',
  },
  header: {
    fontSize: 44,
    fontWeight: 'bold',
    alignItems: 'center',
    color: '#1C2938',
  },
  buttonContainer: {
    width: width,
    height: height / 1.75,
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
    backgroundColor: '#fafafa',
  },
});

export default Home;
