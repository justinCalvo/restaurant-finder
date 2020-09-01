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
          color={photoIndex === 1 ? '#fafafa' : '#1C2938'}
        />
      ) : null}
      {details.details[index].photos.length - 1 >= 2 ? (
        <Icon
          name="ellipse"
          size={10}
          color={photoIndex === 2 ? '#fafafa' : '#1C2938'}
        />
      ) : null}
      {details.details[index].photos.length - 1 >= 3 ? (
        <Icon
          name="ellipse"
          size={10}
          color={photoIndex === 3 ? '#fafafa' : '#1C2938'}
        />
      ) : null}
      {details.details[index].photos.length - 1 >= 4 ? (
        <Icon
          name="ellipse"
          size={10}
          color={photoIndex === 4 ? '#fafafa' : '#1C2938'}
        />
      ) : null}
      {details.details[index].photos.length - 1 >= 5 ? (
        <Icon
          name="ellipse"
          size={10}
          color={photoIndex === 5 ? '#fafafa' : '#1C2938'}
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
