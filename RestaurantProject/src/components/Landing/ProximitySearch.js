import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { Routes } from '../../constants/NavConst';
import Icon from 'react-native-vector-icons/Ionicons';

import { Sizes } from '../../constants/ResponsiveSizes';

import { batch, useDispatch, useSelector } from 'react-redux';

import { getPlaceIds } from '../../redux/actions/currentLocationActions';
import { getNextTwenty } from '../../redux/actions/nextTwentyActions';

const ProximitySearch = ({
  isLoading,
  setIsLoading,
  min,
  max,
  meters,
  type,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const places = useSelector(state => state.places);
  // console.log(places);

  const query = useSelector(state => state.query);

  const getNearby = async () => {
    setIsLoading(true);
    await dispatch(getPlaceIds(min, max, meters, type, query.cuisineQuery));
    navigation.navigate(Routes.ShareToken);
    setIsLoading(false);
  };

  const { colors } = useTheme();

  const styles = StyleSheet.create({
    text: {
      paddingVertical: Sizes.hp10,
      fontSize: Sizes.hp28,
      fontWeight: 'bold',
      color: colors.text,
    },
  });

  return (
    <View>
      <TouchableOpacity onPress={getNearby} title="Nearby Search">
        <Text style={styles.text}>
          <Icon name="navigate-sharp" size={Sizes.hp24} color="#cb3737" />{' '}
          Current Location
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProximitySearch;
