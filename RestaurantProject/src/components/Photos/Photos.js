import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import axios from 'axios';
import config from '../../../config';
import Popover from 'react-native-popover-view';
import ModalScreen from '../../screens/Modal/ModalScreen';

const Photos = ({
  index,
  photoIndex,
  restaurants,
  showDetails,
  setPhotoIndex,
  setRestaurants,
}) => {
  const { width, height } = Dimensions.get('window');

  const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    photo: {
      width: width - 10,
      height: width - 10,
      marginLeft: 5,
      marginRight: 5,
    },
    condensed: {
      width: (width - 10) / 2,
      height: (width - 10) / 2,
    },
    poppop: {
      width: width,
      height: width,
    },
  });

  return (
    <Popover
      from={
        <TouchableWithoutFeedback>
          <View style={styles.container}>
            <Image
              style={showDetails ? styles.condensed : styles.photo}
              source={{
                uri: restaurants[index].photos[photoIndex].url
                  ? restaurants[index].photos[photoIndex].url
                  : 'https://i.imgur.com/6nbpbTN.jpeg',
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      }>
      <View style={styles.poppop}>
        <ModalScreen
          index={index}
          restaurants={restaurants}
          photoIndex={photoIndex}
          setPhotoIndex={setPhotoIndex}
          setRestaurants={setRestaurants}
        />
      </View>
      {/* <Text>This is the contents of the popover</Text> */}
    </Popover>
  );
};

export default Photos;
