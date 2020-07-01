import React from 'react';
import { View, Text } from 'react-native';

const Details = ({ restaurants, index }) => {
  return (
    <View>
      <Text>{restaurants[index].name}</Text>
      <Text>{restaurants[index].price_level}</Text>
      <Text>{restaurants[index].rating}</Text>
      <Text>{restaurants[index].formatted_address}</Text>
    </View>
  );
};

export default Details;
