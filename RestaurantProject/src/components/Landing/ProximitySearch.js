import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import config from '../../../config';
import { Routes } from '../../constants/NavConst';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector, batch } from 'react-redux';
import { getRestaurants } from '../../redux/actions/restaurantsActions';
import { getDetails } from '../../redux/actions/detailsActions';

const ProximitySearch = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.restaurants);
  // const details = useSelector(state => state.details);
  const navigation = useNavigation();

  const getNearby = async () => {
    let getData = await dispatch(getRestaurants());
    // setTimeout(() => {
    navigation.navigate(Routes.Restaurants);
    // }, 100);
  };

  // console.log(wasPressed);
  // console.log(state.restaurants);
  return (
    <View>
      <TouchableOpacity onPress={getNearby} title="Nearby Search">
        <Text style={styles.text}>
          <Icon name="navigate-sharp" size={24} /> Current Location
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    paddingVertical: 10,
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default ProximitySearch;
