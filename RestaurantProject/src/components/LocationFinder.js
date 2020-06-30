import React, { useState, useCallback } from 'react';
import { View, Button } from 'react-native';
import SearchInput from '../components/SearchInput';
import axios from 'axios';
import config from '../../config';

const LocationFinder = ({ city, state, zipcode }) => {
  const [location, setLocation] = useState('');

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
      {location ? (
        <SearchInput location={location} />
      ) : (
        <Button onPress={getCity} title="Location Search" />
      )}
    </View>
  );
};

export default LocationFinder;
