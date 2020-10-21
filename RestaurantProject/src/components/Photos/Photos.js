import React, { useState, useEffect, useCallback } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../constants/NavConst';
import { useSelector } from 'react-redux';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Photos = ({ index, photoIndex, showDetails }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigation = useNavigation();

  const details = useSelector(state => state.details);

  const handlePhotosModal = () => {
    setIsModalOpen(true);
  };

  const openModal = useCallback(() => {
    if (isModalOpen) {
      navigation.navigate(Routes.PhotosModal, {
        index: index,
        isModalOpen: isModalOpen,
        setIsModalOpen: setIsModalOpen,
      });
    }
  }, [isModalOpen, navigation, index]);

  useEffect(() => {
    openModal();
  }, [openModal, isModalOpen]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePhotosModal}>
        <View style={styles.photoContainer}>
          <Image
            style={showDetails ? styles.condensed : styles.photo}
            source={{
              uri: details.details[index].photos[1].url
                ? details.details[index].photos[1].url
                : 'https://i.imgur.com/6nbpbTN.jpeg',
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('83%'),
  },
  photoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: hp('1.1%'),
  },
  photo: {
    width: wp('77%'),
    height: wp('77%'),
    marginLeft: hp('0.6%'),
    marginRight: hp('0.6%'),
  },
  condensed: {
    width: wp('50%'),
    height: wp('50%'),
  },
});

export default Photos;
