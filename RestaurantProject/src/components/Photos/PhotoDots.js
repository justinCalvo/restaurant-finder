import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

const PhotoDots = ({ photoIndex, index }) => {
  const details = useSelector(state => state.details);

  return (
    <View style={styles.container}>
      {details.details[index].photos.length - 1 >= 1 ? (
        <Icon
          name="ellipse"
          size={10}
          color={photoIndex === 1 ? 'white' : '#1C2938'}
        />
      ) : null}
      {details.details[index].photos.length - 1 >= 2 ? (
        <Icon
          name="ellipse"
          size={10}
          color={photoIndex === 2 ? 'white' : '#1C2938'}
        />
      ) : null}
      {details.details[index].photos.length - 1 >= 3 ? (
        <Icon
          name="ellipse"
          size={10}
          color={photoIndex === 3 ? 'white' : '#1C2938'}
        />
      ) : null}
      {details.details[index].photos.length - 1 >= 4 ? (
        <Icon
          name="ellipse"
          size={10}
          color={photoIndex === 4 ? 'white' : '#1C2938'}
        />
      ) : null}
      {details.details[index].photos.length - 1 >= 5 ? (
        <Icon
          name="ellipse"
          size={10}
          color={photoIndex === 5 ? 'white' : '#1C2938'}
        />
      ) : null}
      {details.details[index].photos.length - 1 >= 6 ? (
        <Icon
          name="ellipse"
          size={10}
          color={photoIndex === 6 ? 'white' : '#1C2938'}
        />
      ) : null}
      {details.details[index].photos.length - 1 >= 7 ? (
        <Icon
          name="ellipse"
          size={10}
          color={photoIndex === 7 ? 'white' : '#1C2938'}
        />
      ) : null}
      {details.details[index].photos.length - 1 >= 8 ? (
        <Icon
          name="ellipse"
          size={10}
          color={photoIndex === 8 ? 'white' : '#1C2938'}
        />
      ) : null}
      {details.details[index].photos.length - 1 >= 9 ? (
        <Icon
          name="ellipse"
          size={10}
          color={photoIndex === 9 ? 'white' : '#1C2938'}
        />
      ) : null}
      {details.details[index].photos.length - 1 >= 10 ? (
        <Icon
          name="ellipse"
          size={10}
          color={photoIndex === 10 ? 'white' : '#1C2938'}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default PhotoDots;
