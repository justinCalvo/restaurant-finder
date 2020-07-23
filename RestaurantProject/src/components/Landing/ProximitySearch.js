import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import config from '../../../config';
import { Routes } from '../../constants/NavConst';

const ProximitySearch = () => {
  const navigation = useNavigation();

  const [restaurants, setRestaurants] = useState([]);
  const [nextPageToken, setNextPageToken] = useState('');

  const getNearby = useCallback(() => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurant&opennow&key=${
          config.API_KEY
        }`,
      )
      .then(data => {
        let proximityResults = data.data.results;
        setNextPageToken(data.data.next_page_token);
        axios
          .get(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${
              proximityResults[0].place_id
            }&fields=formatted_phone_number,opening_hours/weekday_text,website,photo,review&key=${
              config.API_KEY
            }`,
          )
          .then(description => {
            axios
              .get(
                `https://maps.googleapis.com/maps/api/place/details/json?place_id=${
                  proximityResults[1].place_id
                }&fields=formatted_phone_number,opening_hours/weekday_text,website,photo,review&key=${
                  config.API_KEY
                }`,
              )
              .then(newDescription => {
                for (var key in description.data.result) {
                  proximityResults[0][key] = description.data.result[key];
                }
                for (var key in newDescription.data.result) {
                  proximityResults[1][key] = newDescription.data.result[key];
                }
                setRestaurants(proximityResults);
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
    if (restaurants.length > 0) {
      navigation.navigate(Routes.Restaurants, {
        restaurants: restaurants,
        setRestaurants: setRestaurants,
      });
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
