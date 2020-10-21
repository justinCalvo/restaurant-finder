import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

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

  const { colors } = useTheme();

  const styles = StyleSheet.create({
    text: {
      paddingVertical: hp('1.1%'),
      fontSize: hp('3.2%'),
      fontWeight: 'bold',
      color: colors.text,
    },
    header: {
      fontSize: hp('4.9%'),
      fontWeight: 'bold',
      color: colors.text,
    },
    buttonContainer: {
      height: hp('66.5%'),
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    topContainer: {
      height: hp('20%'),
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerContainer: {
      paddingVertical: hp('1.1%'),
    },
  });

  return (
    <KeyboardAwareScrollView
      style={styles.keyboardColor}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}
      extraScrollHeight={hp('2.3%')}>
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
            <Icon name="search-sharp" size={hp('2.7%')} color="#cb3737" />{' '}
            Search Location
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
