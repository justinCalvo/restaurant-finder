import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  Text,
  Button,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import config from '../../config';

const Photos = ({ photos, showDetails }) => {
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
    },
    condensed: {
      // display: 'none',
      width: (width - 10) / 2,
      height: (width - 10) / 2,
    },
  });

  const [photoString, setPhotoString] = useState('');

  const getPhotos = useCallback(() => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${
          photos[0].photo_reference
        }&key=${config.API_KEY}`,
      )
      .then(data => {
        setPhotoString(data.config.url.toString());
        // console.log(data)
      })
      .catch(err => console.log(err));
    // console.log('Log this shit: ', photos[0].photo_reference);
  }, [photos]);

  useEffect(() => {
    getPhotos();
  }, [getPhotos, photoString]);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={showDetails ? styles.condensed : styles.photo}
        source={{
          uri: photoString ? photoString : 'https://i.imgur.com/6nbpbTN.jpeg',
        }}
      />
    </SafeAreaView>
  );
};

export default Photos;
