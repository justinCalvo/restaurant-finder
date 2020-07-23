import React, { useState, useCallback, useEffect } from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import config from '../../../config';

const CitySearch = ({ city, state, zipcode }) => {
  const navigation = useNavigation();

  const [restaurants, setRestaurants] = useState('');
  const [placeDetails, setPlaceDetails] = useState([]);

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
      })
      .catch(err => {
        console.log(err);
      });
  }, [city, state, zipcode]);

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
      <Button onPress={getCity} title="Search" />
    </View>
  );
};

export default CitySearch;
