import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import config from '../../config';

const ProximitySearch = () => {
  const navigation = useNavigation();

  const [restaurants, setRestaurants] = useState('');

  const getNearby = useCallback(() => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurant&opennow&key=${
          config.API_KEY
        }`,
      )
      .then(data => {
        setRestaurants(data.data.results);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

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
      <TouchableOpacity onPress={getNearby} title="Nearby Search">
        <Text style={styles.text}>Nearby</Text>
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
