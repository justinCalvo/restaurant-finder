import React from 'react';
import { View, Text, FlatList } from 'react-native';

const Description = ({ placeDetails, index }) => {
  console.log(placeDetails[index]);
  return (
    <View>
      <Text>Phone#: {placeDetails[index].formatted_phone_number}</Text>
      <Text>{placeDetails[index].website}</Text>
      <Text>
        {placeDetails[index].opening_hours.weekday_text[0]}
        {'\n'}
        {placeDetails[index].opening_hours.weekday_text[1]}
        {'\n'}
        {placeDetails[index].opening_hours.weekday_text[2]}
        {'\n'}
        {placeDetails[index].opening_hours.weekday_text[3]}
        {'\n'}
        {placeDetails[index].opening_hours.weekday_text[4]}
        {'\n'}
        {placeDetails[index].opening_hours.weekday_text[5]}
        {'\n'}
        {placeDetails[index].opening_hours.weekday_text[6]}
      </Text>
      {placeDetails[index].reviews ? (
        <FlatList
          data={placeDetails[index].reviews}
          keyExtractor={(item, i) => i.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.author_name}</Text>
              <Text>Customer Rating: {item.rating}</Text>
              <Text>{item.relative_time_description}</Text>
              <Text>{item.text}</Text>
            </View>
          )}
        />
      ) : (
        <Text>No Reviews</Text>
      )}
    </View>
  );
};

export default Description;
