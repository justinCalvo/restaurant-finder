import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const LikeButton = ({ size, MainAction, RightActions }) => {
  const likeButton = () => {
    RightActions();
  };

  return (
    <>
      <TouchableOpacity onPress={likeButton}>
        <Icon name="heart-circle" size={size} color="#ee6f57" />
      </TouchableOpacity>
    </>
  );
};

export default LikeButton;
