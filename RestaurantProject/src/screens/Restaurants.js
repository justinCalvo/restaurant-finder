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

const Restaurants = ({ route }) => {
  const [index, setIndex] = useState(0);

  const LeftActions = () => {
    setIndex(index + 1);
  };

  return (
    <FlingGestureHandler
      // eslint-disable-next-line no-bitwise
      direction={Directions.RIGHT | Directions.LEFT}
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
          console.log(nativeEvent);
          console.log(State.ACTIVE);
          LeftActions();
        }
      }}>
      <SafeAreaView style={styles.container}>
        <Matches index={index} />
        <Photos index={index} />
        <Details
          restaurants={route.params.restaurants}
          index={index}
          setIndex={setIndex}
        />
      </SafeAreaView>
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
