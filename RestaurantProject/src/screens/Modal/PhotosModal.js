import React, { useState, useEffect, useCallback } from 'react';
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
import { getNextPhotos } from '../../API/getNextPhotos';
import { CommonActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails } from '../../redux/actions/detailsActions';

const PhotosModal = ({ route }) => {
  const [swipedRight, setSwipedRight] = useState(false);
  const [swipedLeft, setSwipedLeft] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(1);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const state = useSelector(state => state.details);

  const SwipeRight = useCallback(() => {
    setSwipedRight(true);
  }, []);

  const SwipeLeft = useCallback(() => {
    setSwipedLeft(true);
  }, []);

  useEffect(() => {
    if (photoIndex > 1 && swipedRight) {
      setPhotoIndex(photoIndex - 1);
      setSwipedRight(false);
    }

    if (
      photoIndex < state.details[route.params.index].photos.length - 1 &&
      swipedLeft
    ) {
      dispatch(
        getDetails(state.details, undefined, route.params.index, photoIndex),
      );
      setPhotoIndex(photoIndex + 1);
      setSwipedLeft(false);
    }
  }, [
    isFocused,
    navigation,
    swipedLeft,
    swipedRight,
    photoIndex,
    state.details,
    route.params.index,
    dispatch,
  ]);

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
          <View style={styles.imageContainer}>
            <Image
              style={styles.photo}
              source={{
                uri: state.details[route.params.index].photos[photoIndex].url
                  ? state.details[route.params.index].photos[photoIndex].url
                  : 'https://i.imgur.com/6nbpbTN.jpeg',
              }}
            />
            <Text style={styles.text}>
              {photoIndex} of{' '}
              {state.details[route.params.index].photos.length - 1}
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
    width: (38 * width) / 43,
    height: (38 * width) / 43,
  },
  imageContainer: {
    width: (38 * width) / 40,
    height: (38 * width) / 40,
    backgroundColor: 'black',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalClose: {
    height: height * 0.3,
    width: width,
    backgroundColor: 'transparent',
  },
  text: {
    color: 'white',
  },
});

export default PhotosModal;
