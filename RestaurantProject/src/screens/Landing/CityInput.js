import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';
import CitySearch from '../../components/Landing/CitySearch';

const CityInput = () => {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={setCity}
        value={city}
        placeholder="city"
      />
      <TextInput
        style={styles.textInput}
        onChangeText={setState}
        value={state}
        placeholder="state"
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>OR</Text>
      </View>
      <TextInput
        style={styles.textInput}
        onChangeText={setZipcode}
        value={zipcode}
        placeholder="zipcode"
      />
      <CitySearch city={city} state={state} zipcode={zipcode} />
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width,
    paddingHorizontal: 50,
  },
  textInput: {
    fontSize: 28,
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingVertical: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textContainer: {
    paddingTop: 30,
  },
});

export default CityInput;
