import React from 'react';
import { View, Text, Button } from 'react-native';

const Details = ({ restaurants, index, setIndex }) => {
  const incrementIndex = () => {
    setIndex(index + 1);
  };

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
