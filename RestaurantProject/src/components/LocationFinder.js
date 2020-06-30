import React, { useState, useCallback } from 'react';
import { View, Button } from 'react-native';
import axios from 'axios';
import config from '../../config';

const LocationFinder = ({ city, state, zipcode }) => {
  const [restaurants, setRestaurants] = useState('');

  const getCity = useCallback(() => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${city},${state},${zipcode}&key=${
          config.API_KEY
        }`,
      )
      .then(location => {
        const locationPath = location.data.results[0].geometry.location;
        axios
          .get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
              locationPath.lat
            },${locationPath.lng}&radius=8046.72&type=restaurant&opennow&key=${
              config.API_KEY
            }`,
          )
          .then(data => {
            setRestaurants(data.data.results);
            console.log(data.data.results);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }, [city, state, zipcode]);

  return (
    <View>
      <Button onPress={getCity} title="Location Search" />
    </View>
  );
};

export default LocationFinder;
