import React, { useState, useCallback } from 'react';
import { View, Button, TextInput } from 'react-native';
import axios from 'axios';
import RestaurantList from './RestaurantList';
import config from '../../config';

const LocationFinder = () => {
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');

  const getCity = useCallback(() => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${city},${state},${zipcode}&key=${
          config.API_KEY
        }`,
      )
      .then(results => {
        setLocation(results.data.results[0].geometry.location);
      })
      .catch(err => {
        console.log(err);
      });
  }, [city, state, zipcode]);

  return (
    <View>
      <TextInput onChangeText={setCity} value={city} placeholder="city" />
      <TextInput onChangeText={setState} value={state} placeholder="state" />
      <TextInput
        onChangeText={setZipcode}
        value={zipcode}
        placeholder="zipcode"
      />
      <Button onPress={getCity} title="Nearby" />
      <RestaurantList location={location} />
    </View>
  );
};

export default LocationFinder;
