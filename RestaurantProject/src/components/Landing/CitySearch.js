import React, { useState, useCallback, useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import config from '../../../config';
import { Routes } from '../../constants/NavConst';
import { useDispatch, useSelector } from 'react-redux';
import { getLocation } from '../../redux/actions/locationActions';

const CitySearch = ({ city, states, zipcode }) => {
  const dispatch = useDispatch();
  const restaurants = useSelector(state => state.restaurants);
  const navigation = useNavigation();

  const getCity = async () => {
    if ((city && states) || zipcode) {
      let getData = await dispatch(getLocation(city, states, zipcode));
      // console.log(restaurants);
      navigation.navigate(Routes.Restaurants);
    } else {
      Alert.alert('Please enter city and state or zip code');
    }
  };

  return (
    <View>
      <Button onPress={getCity} title="Search" />
    </View>
  );
};

export default CitySearch;
