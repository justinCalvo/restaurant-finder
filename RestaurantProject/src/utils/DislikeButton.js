import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const DislikeButton = ({ size, MainAction }) => {
  return (
    <>
      <TouchableOpacity onPress={MainAction}>
        <Icon name="close-circle" size={size} color="#1C2938" />
      </TouchableOpacity>
    </>
  );
};

export default DislikeButton;
