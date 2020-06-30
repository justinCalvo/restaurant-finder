import React, { useState, useCallback } from 'react';
import { View, Button } from 'react-native';
import axios from 'axios';
import config from '../../config';

const RestaurantList = ({ location }) => {
  // const [restaurants, setRestaurants] = useState('');

  const getData = useCallback(() => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
          location.lat
        },${location.lng}&radius=8046.72&type=restaurant&key=${config.API_KEY}`,
      )
      .then(results => console.log(results))
      .catch(err => {
        console.log(err);
      });
  }, [location.lat, location.lng]);

  const getNearby = useCallback(() => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurant&key=${
          config.API_KEY
        }`,
      )
      .then(results => console.log(results))
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <View>
      <Button onPress={getData} title="Get Restaurants" />
      <Button onPress={getNearby} title="Lazy" />
    </View>
  );
};

export default RestaurantList;
