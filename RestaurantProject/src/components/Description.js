import React, { useCallback } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';
import config from '../../config';

const Description = ({ restaurants, index }) => {
  const getDescription = useCallback(() => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${
          restaurants[index].placeId
        }&fields=formatted_phone_number,opening_hours,website,address_component,adr_address,photo&key=${
          config.API_KEY
        }`,
      )
      // .then(data => console.log('this data:', data));
      .catch(err => console.log(err));
  }, [restaurants, index]);
  return (
    <View>
      <Button title="Test" onPress={getDescription} />
    </View>
  );
};

export default Description;
