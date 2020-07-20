import React, { useState, useCallback, useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import config from '../../config';

const LocationFinder = ({ city, state, zipcode }) => {
  const navigation = useNavigation();

  const [restaurants, setRestaurants] = useState('');

  const styles = StyleSheet.create({
    container: {
      paddingTop: 10,
    },
    banner: {
      textAlign: center,
      fontWeight: 'bold',
      fontSize: 18,
    },
  });

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
            // console.log(data.data.results);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }, [city, state, zipcode]);

  const sendRestaurants = useCallback(() => {
    if (restaurants.length > 0) {
      navigation.navigate('Restaurants', { restaurants: restaurants });
    }
  }, [restaurants, navigation]);

  useEffect(() => {
    sendRestaurants();
  }, [sendRestaurants, restaurants]);

  return (
    <View>
      <Button onPress={getCity} title="Search" />
    </View>
  );
};

export default LocationFinder;
