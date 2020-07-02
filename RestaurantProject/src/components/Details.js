import React from 'react';
import { View, Text, Button } from 'react-native';
import GestureRecognizer, {
  swipeDirections,
} from 'react-native-swipe-gestures';

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
      <Button title="test" onPress={incrementIndex} />
    </View>
  );
};

export default Details;
