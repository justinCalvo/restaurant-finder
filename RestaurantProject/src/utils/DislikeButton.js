import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const DislikeButton = ({ size, LeftActions }) => {
  return (
    <>
      <TouchableOpacity onPress={LeftActions}>
        <Icon name="close-circle" size={size} color="#1C2938" />
      </TouchableOpacity>
    </>
  );
};

export default DislikeButton;
