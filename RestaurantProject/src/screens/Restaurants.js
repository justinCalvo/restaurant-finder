import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import Details from '../components/Details';
import Photos from '../components/Photos';
import Matches from '../components/Matches';
import Description from '../components/Description';
import axios from 'axios';
import config from '../../config';

const Restaurants = ({ route }) => {
  const [index, setIndex] = useState(0);

  const LeftActions = () => {
    getNext();
    setIndex(index + 1);
  };

  const RightActions = () => {
    getNext();
    setIndex(index + 1);
    // TODO: add selected data to database as a "favorite"
  };

  const getNext = () => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${
          route.params.restaurants[index + 2].place_id
        }&fields=formatted_phone_number,opening_hours,website,photo&key=${
          config.API_KEY
        }`,
      )
      .then(description => {
        route.params.setPlaceDetails(oldArray => [
          ...oldArray,
          description.data.result,
        ]);
      })
      .catch(err => {
        console.log(err);
      });
  };
  console.log(route.params.placeDetails[index]);
  return (
    <FlingGestureHandler
      direction={Directions.LEFT}
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
          LeftActions();
        }
      }}>
      <FlingGestureHandler
        direction={Directions.RIGHT}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.ACTIVE) {
            RightActions();
          }
        }}>
        <SafeAreaView style={styles.container}>
          <Matches index={index} />
          <Photos index={index} />
          <Details
            restaurants={route.params.restaurants}
            index={index}
            setIndex={setIndex}
            placeDetails={route.params.placeDetails}
          />
          <Description restaurants={route.params.restaurants} index={index} />
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Restaurants;
