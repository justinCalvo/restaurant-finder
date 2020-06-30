import React, { useState, useCallback, useEffect } from 'react';
import { View, Button } from 'react-native';
import axios from 'axios';
import config from '../../config';

const SearchInput = ({ location }) => {
  const [restaurants, setRestaurants] = useState('');
  console.log('search location: ', location);
  const getData = useCallback(() => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
          location.lat
        },${location.lng}&radius=8046.72&type=restaurant&key=${config.API_KEY}`,
      )
      .then(results => {
        setRestaurants(results);
      })
      .catch(err => {
        console.log(err);
      });
  }, [location.lat, location.lng]);

  useEffect(() => {
    getData();
  }, [location, getData]);
  console.log(restaurants);
  return (
    <View>
      <Button onPress={getData} title="Get Restaurants" />
    </View>
  );
};

export default SearchInput;
