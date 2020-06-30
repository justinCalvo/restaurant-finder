import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import config from '../../config';

const ProximitySearch = () => {
  // const [restaurants, setRestaurants] = useState('');
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
      <TouchableOpacity onPress={getNearby} title="Nearby Search">
        <Text>Nearby</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProximitySearch;
