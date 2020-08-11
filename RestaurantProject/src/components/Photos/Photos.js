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
import { useSelector } from 'react-redux';

const Photos = ({ index, photoIndex, showDetails }) => {
  const navigation = useNavigation();
  const state = useSelector(state => state.details);

  // const handlePhotosModal = () => {
  //   navigation.navigate(Routes.PhotosModal, {
  //     index: index,
  //     restaurants: restaurants,
  //     photoIndex: photoIndex,
  //     setPhotoIndex: setPhotoIndex,
  //   });
  // };

  return (
    <View>
      {/* <TouchableWithoutFeedback onPress={handlePhotosModal}> */}
      <TouchableWithoutFeedback>
        <View style={styles.container}>
          <Image
            style={showDetails ? styles.condensed : styles.photo}
            source={{
              uri: state.details[index].photos[1].url
                ? state.details[index].photos[1].url
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
    paddingTop: 10,
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
