import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, Text, Button, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import config from '../../config';


const Photos = ({ photos }) => {

  const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    photo: {
      width: 415,
      height: 415,
    },
  });

  const [photoString, setPhotoString] = useState('');

  const getPhotos = useCallback(() => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photos[0].photo_reference}&key=${
          config.API_KEY
        }`
      )
      .then(data => {
        setPhotoString(data.config.url.toString());
        // console.log(data)
      })
      .catch(err => console.log(err))
    // console.log('Log this shit: ', photos[0].photo_reference);
  }, [photos]);

  useEffect(() => {
    getPhotos();
  }, [getPhotos, photoString]);


  return (
    <SafeAreaView>
      <Image style={styles.photo} source= {{ uri: photoString ?  photoString : 'https://i.imgur.com/6nbpbTN.jpeg'}}></Image>
      {/* <Image style={styles.photo} source= {{ uri: photoString }}></Image> */}
      {/* <Image style={styles.photo} source= {{ uri: 'https://i.imgur.com/6nbpbTN.jpeg'}}></Image> */}
    </SafeAreaView>
  );
};

export default Photos;
