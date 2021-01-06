import React, { useState, useEffect, useCallback } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../constants/NavConst';
import { useSelector } from 'react-redux';

import { Sizes } from '../../constants/ResponsiveSizes';

const Photos = ({ index, photoIndex, showDetails }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigation = useNavigation();

  const details = useSelector(state => state.details);
  const photoSize = useSelector(state => state.photoSize);

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

  const styles = StyleSheet.create({
    photoContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: Sizes.hp10,
    },
    photo: {
      width: photoSize.photoSize,
      height: photoSize.photoSize,
      marginLeft: Sizes.hp5,
      marginRight: Sizes.hp5,
    },
    condensed: {
      width: photoSize.condensedPhotoSize,
      height: photoSize.condensedPhotoSize,
    },
  });

  return (
    <>
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
    </>
  );
};

export default Photos;
