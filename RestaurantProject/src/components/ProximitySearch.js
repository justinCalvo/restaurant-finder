import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import config from '../../config';

const ProximitySearch = () => {
  const navigation = useNavigation();

  const [restaurants, setRestaurants] = useState([]);
  const [placeDetails, setPlaceDetails] = useState([]);

  const getNearby = useCallback(() => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurant&opennow&key=${
          config.API_KEY
        }`,
      )
      .then(data => {
        setRestaurants(data.data.results);
        axios
          .get(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${
              data.data.results[0].place_id
            }&fields=formatted_phone_number,opening_hours,website,photo&key=${
              config.API_KEY
            }`,
          )
          .then(description => {
            axios
              .get(
                `https://maps.googleapis.com/maps/api/place/details/json?place_id=${
                  data.data.results[1].place_id
                }&fields=formatted_phone_number,opening_hours,website,photo&key=${
                  config.API_KEY
                }`,
              )
              .then(newDescription => {
                setPlaceDetails(oldArray => [
                  ...oldArray,
                  description.data.result,
                  newDescription.data.result,
                ]);
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const sendRestaurants = useCallback(() => {
    if (placeDetails.length > 0) {
      navigation.navigate('Restaurants', {
        restaurants: restaurants,
        placeDetails: placeDetails,
        setPlaceDetails: setPlaceDetails,
      });
    }
  }, [restaurants, navigation, placeDetails]);

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
