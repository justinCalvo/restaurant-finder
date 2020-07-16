import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';

const Description = ({ placeDetails, index }) => {
  const [showDescription, setShowDescription] = useState(true);

  return (
    <FlingGestureHandler
      direction={Directions.UP}
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
          console.log('up');
          setShowDescription(true);
        }
      }}>
      <FlingGestureHandler
        direction={Directions.DOWN}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.ACTIVE) {
            console.log('down');
            setShowDescription(false);
          }
        }}>
        <View>
          <Text>Description</Text>
          <View style={[showDescription ? styles.display : styles.hide]}>
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
        </View>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

const styles = StyleSheet.create({
  display: {
    display: 'flex',
  },
  hide: {
    display: 'none',
  },
});

export default Description;
