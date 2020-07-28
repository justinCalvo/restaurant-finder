import React, { useState, useCallback, useEffect } from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import config from '../../../config';
import { Routes } from '../../constants/NavConst';
import { getRestaurants } from '../../API/getNearby';

const CitySearch = ({ city, state, zipcode }) => {
  const navigation = useNavigation();

  const [restaurants, setRestaurants] = useState([]);
  const [nextPageToken, setNextPageToken] = useState('');

  const getCity = useCallback(() => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${city},${state},${zipcode}&key=${
          config.API_KEY
        }`,
      )
      .then(location => {
        const locationPath = location.data.results[0].geometry.location;
        getRestaurants(
          locationPath.lat,
          locationPath.lng,
          config,
          axios,
          setNextPageToken,
          setRestaurants,
        );
      })
      .catch(err => {
        console.log(err);
      });
  }, [city, state, zipcode]);

  const sendRestaurants = useCallback(() => {
    if (restaurants.length > 0) {
      navigation.navigate(Routes.Restaurants, {
        restaurants: restaurants,
        setRestaurants: setRestaurants,
        nextPageToken: nextPageToken,
        setNextPageToken: setNextPageToken,
      });
    }
  }, [restaurants, navigation, nextPageToken]);

  useEffect(() => {
    sendRestaurants();
  }, [sendRestaurants, restaurants]);

  return (
    <View>
      <Button onPress={getCity} title="Search" />
    </View>
  );
};

export default CitySearch;
