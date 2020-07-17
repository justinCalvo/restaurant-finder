import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import Reviews from './Reviews';

const Details = ({
  placeDetails,
  index,
  showDetails,
  setShowDetails,
  viewReviews,
  setViewReviews,
}) => {
  return (
    <FlingGestureHandler
      direction={Directions.UP}
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
          setShowDetails(true);
        }
      }}>
      <FlingGestureHandler
        direction={Directions.DOWN}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.ACTIVE) {
            setShowDetails(false);
          }
        }}>
        <View>
          <Text style={styles.description}>View Details</Text>
          <View style={[showDetails ? styles.display : styles.hide]}>
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
            <Reviews
              placeDetails={placeDetails}
              index={index}
              viewReviews={viewReviews}
              setViewReviews={setViewReviews}
            />
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
  description: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'black',
    color: 'white',
  },
});

export default Details;
