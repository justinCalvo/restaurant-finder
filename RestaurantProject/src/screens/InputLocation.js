import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import LocationFinder from '../components/LocationFinder';

const InputLocation = () => {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');

  return (
    <View>
      <TextInput onChangeText={setCity} value={city} placeholder="city" />
      <TextInput onChangeText={setState} value={state} placeholder="state" />
      <TextInput
        onChangeText={setZipcode}
        value={zipcode}
        placeholder="zipcode"
      />
      <LocationFinder city={city} state={state} zipcode={zipcode} />
    </View>
  );
};

export default InputLocation;
