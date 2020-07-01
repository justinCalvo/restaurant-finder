import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import LocationFinder from '../components/LocationFinder';

const InputLocation = () => {
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
      <LocationFinder city={city} state={state} zipcode={zipcode} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 50,
    backgroundColor: 'white',
  },
  textInput: {
    fontSize: 28,
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingVertical: 10,
  },
});

export default InputLocation;
