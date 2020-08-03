import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import config from '../../../config';
import { Routes } from '../../constants/NavConst';
import { getRestaurants } from '../../API/getNearby';
import Icon from 'react-native-vector-icons/Ionicons';

const ProximitySearch = () => {
  const navigation = useNavigation();

  const [restaurants, setRestaurants] = useState([]);
  const [nextPageToken, setNextPageToken] = useState('');

  const getNearby = useCallback(() => {
    let lat, lng;
    getRestaurants(lat, lng, config, axios, setNextPageToken, setRestaurants);
  }, []);

  const sendRestaurants = useCallback(() => {
    if (restaurants.length > 0) {
      navigation.navigate(Routes.Restaurants, {
        restaurants: restaurants,
        nextPageToken: nextPageToken,
      });
      navigation.setOptions({
        setRestaurants: setRestaurants,
        setNextPageToken: setNextPageToken,
      });
    }
  }, [restaurants, navigation, nextPageToken]);

  useEffect(() => {
    sendRestaurants();
  }, [sendRestaurants, restaurants]);

  return (
    <View>
      <TouchableOpacity onPress={getNearby} title="Nearby Search">
        <Text style={styles.text}>
          <Icon name="navigate-sharp" size={24} /> Current Location
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    paddingVertical: 10,
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default ProximitySearch;
