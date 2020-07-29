import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import axios from 'axios';
import config from '../../../config';
import { getNextPhotos } from '../../API/getNextPhotos';
import { CommonActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const PhotosModal = ({ route }) => {
  const navigation = useNavigation();

  const SwipeRight = () => {
    if (route.params.photoIndex >= 1) {
      route.params.setPhotoIndex(route.params.photoIndex--);
    }
  };

  const SwipeLeft = () => {
    // console.log(setRestaurants);
    if (
      route.params.photoIndex <=
      route.params.restaurants[route.params.index].photos.length - 1
    ) {
      getNextPhotos(
        route.params.photoIndex,
        route.params.restaurants,
        route.params.setRestaurants,
        route.params.setPhotoIndex,
        route.params.index,
        axios,
        config,
        width,
      );
      route.params.setPhotoIndex(route.params.photoIndex++);
    } else {
      route.params.setPhotoIndex(1);
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
        <View style={styles.container}>
          <TouchableWithoutFeedback
            onPress={() => navigation.dispatch(CommonActions.goBack())}>
            <View style={styles.modalClose} />
          </TouchableWithoutFeedback>
          <Image
            style={styles.photo}
            source={{
              uri: route.params.restaurants[route.params.index].photos[
                route.params.photoIndex
              ].url
                ? route.params.restaurants[route.params.index].photos[
                    route.params.photoIndex
                  ].url
                : 'https://i.imgur.com/6nbpbTN.jpeg',
            }}
          />
          <View>
            <Text>
              {route.params.photoIndex} of{' '}
              {route.params.restaurants[route.params.index].photos.length - 1}
            </Text>
          </View>
          <TouchableWithoutFeedback
            onPress={() => navigation.dispatch(CommonActions.goBack())}>
            <View style={styles.modalClose} />
          </TouchableWithoutFeedback>
        </View>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  photo: {
    width: (38 * width) / 40,
    height: (38 * width) / 40,
  },
  modalClose: {
    height: height * 0.3,
    width: width,
    backgroundColor: 'transparent',
  },
});

export default PhotosModal;
