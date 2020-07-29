import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';
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
  },
});

export default CityInput;
