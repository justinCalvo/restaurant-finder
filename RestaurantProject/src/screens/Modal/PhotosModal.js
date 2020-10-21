import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import PhotoDots from '../../components/Photos/PhotoDots';

import {
  CommonActions,
  useNavigation,
  useIsFocused,
  useTheme,
} from '@react-navigation/native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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

  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    photo: {
      width: wp('88%'),
      height: wp('88%'),
    },
    imageContainer: {
      width: wp('90%'),
      height: wp('90%'),
      backgroundColor: colors.text,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalClose: {
      height: hp('30%'),
      width: wp('100%'),
      backgroundColor: 'transparent',
    },
  });

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

export default PhotosModal;
