import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';

import ProximitySearch from '../../components/Landing/ProximitySearch';
import CitySearch from '../../components/Landing/CitySearch';
import Loading from '../../components/Loading/Loading';

import PreferencesScreen from './PreferencesScreen';

const CreateSession = () => {
  const [toggleCitySearch, setToggleCitySearch] = useState(false);
  const [toggleOptions, setToggleOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [min, setMin] = useState('1');
  const [max, setMax] = useState('4');
  const [meters, setMeters] = useState('8046.72');
  const [type, setType] = useState('restaurant');

  const handleSearchLocationPress = () => {
    setToggleOptions(false);
    setToggleCitySearch(!toggleCitySearch);
  };

  const { width, height } = Dimensions.get('window');
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      width: width,
      height: height,
      flex: 1,
      alignItems: 'center',
    },
    text: {
      paddingVertical: 10,
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
    },
    header: {
      fontSize: 44,
      fontWeight: 'bold',
      alignItems: 'center',
      color: colors.text,
    },
    buttonContainer: {
      width: width,
      height: height / 1.5,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    topContainer: {
      width: width,
      height: height / 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    // keyboardColor: {
    //   backgroundColor: '#fafafa',
    // },
    headerContainer: {
      paddingVertical: 10,
    },
  });

  return (
    <KeyboardAwareScrollView
      style={styles.keyboardColor}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
      extraScrollHeight={20}>
      <View style={styles.buttonContainer}>
        <View style={styles.topContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>WeCide</Text>
          </View>
        </View>
        {isLoading ? <Loading /> : null}
        <PreferencesScreen
          min={min}
          setMin={setMin}
          max={max}
          setMax={setMax}
          setMeters={setMeters}
          toggleOptions={toggleOptions}
          setToggleOptions={setToggleOptions}
          setToggleCitySearch={setToggleCitySearch}
          type={type}
          setType={setType}
        />
        <ProximitySearch
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          min={min}
          max={max}
          meters={meters}
          type={type}
        />
        <TouchableOpacity onPress={() => handleSearchLocationPress()}>
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
          type={type}
        />
      ) : null}
    </KeyboardAwareScrollView>
  );
};

export default CreateSession;
