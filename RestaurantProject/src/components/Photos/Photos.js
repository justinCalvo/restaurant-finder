import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../constants/NavConst';

const Photos = ({
  index,
  photoIndex,
  restaurants,
  showDetails,
  setPhotoIndex,
  setRestaurants,
}) => {
  const navigation = useNavigation();

  const handlePhotosModal = () => {
    navigation.navigate(Routes.PhotosModal, {
      index: index,
      restaurants: restaurants,
      photoIndex: photoIndex,
      setPhotoIndex: setPhotoIndex,
      setRestaurants: setRestaurants,
    });
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={handlePhotosModal}>
        <View style={styles.container}>
          <Image
            style={showDetails ? styles.condensed : styles.photo}
            source={{
              uri: restaurants[index].photos[1].url
                ? restaurants[index].photos[1].url
                : 'https://i.imgur.com/6nbpbTN.jpeg',
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
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
});

export default Photos;
