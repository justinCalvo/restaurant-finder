import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import axios from 'axios';
import config from '../../../config';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getNextPhotos } from '../../API/getNextPhotos';

const ModalScreen = ({
  photoIndex,
  restaurants,
  setRestaurants,
  setPhotoIndex,
  index,
}) => {
  const { width, height } = Dimensions.get('window');

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    photo: {
      width: (38 * width) / 40,
      height: (38 * width) / 40,
    },
    poppop: {
      width: width,
      height: width,
    },
  });

  const SwipeRight = () => {
    if (photoIndex >= 1) {
      setPhotoIndex(photoIndex--);
    }
  };

  const SwipeLeft = () => {
    // console.log(setRestaurants);
    if (photoIndex <= restaurants[index].photos.length - 1) {
      getNextPhotos(
        photoIndex,
        restaurants,
        setRestaurants,
        setPhotoIndex,
        index,
        axios,
        config,
        width,
      );
      setPhotoIndex(photoIndex++);
    } else {
      setPhotoIndex(1);
    }
  };

  return (
    <FlingGestureHandler
      direction={Directions.LEFT}
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
          SwipeLeft();
        }
      }}>
      <FlingGestureHandler
        direction={Directions.RIGHT}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.ACTIVE) {
            SwipeRight();
          }
        }}>
        <View>
          <View style={styles.container}>
            <Text>
              {photoIndex} of {restaurants[index].photos.length - 1}
            </Text>
          </View>
          <Image
            style={styles.photo}
            source={{
              uri: restaurants[index].photos[photoIndex].url
                ? restaurants[index].photos[photoIndex].url
                : 'https://i.imgur.com/6nbpbTN.jpeg',
            }}
          />
        </View>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

export default ModalScreen;
