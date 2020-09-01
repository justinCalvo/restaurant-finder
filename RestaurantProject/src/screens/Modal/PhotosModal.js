import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
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
import PhotoDots from '../../components/Photos/PhotoDots';

// import { getNextPhotos } from '../../API/getNextPhotos';
import { CommonActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails } from '../../redux/actions/detailsActions';

const PhotosModal = ({ route }) => {
  const [swipedRight, setSwipedRight] = useState(false);
  const [swipedLeft, setSwipedLeft] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(1);

  const details = useSelector(state => state.details);

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const SwipeRight = useCallback(() => {
    setSwipedRight(true);
  }, []);

  const SwipeLeft = useCallback(() => {
    setSwipedLeft(true);
  }, []);

  useEffect(() => {
    if (route.params.isModalOpen) {
      dispatch(getDetails(details.details, undefined, route.params.index, 0));
      route.params.setIsModalOpen(false);
    }
    if (photoIndex > 1 && swipedRight) {
      setPhotoIndex(photoIndex - 1);
      setSwipedRight(false);
    }

    if (photoIndex < 5 && swipedLeft) {
      dispatch(
        getDetails(details.details, undefined, route.params.index, photoIndex),
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
    details.details,
    dispatch,
    route.params,
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
                uri: details.details[route.params.index].photos[photoIndex].url
                  ? details.details[route.params.index].photos[photoIndex].url
                  : 'https://i.imgur.com/6nbpbTN.jpeg',
              }}
            />
          </View>
          <PhotoDots photoIndex={photoIndex} index={route.params.index} />
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
    width: (36 * width) / 40,
    height: (36 * width) / 40,
    backgroundColor: '#1C2938',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalClose: {
    height: height * 0.3,
    width: width,
    backgroundColor: 'transparent',
  },
  text: {
    color: '#F4F6F6',
  },
});

export default PhotosModal;
