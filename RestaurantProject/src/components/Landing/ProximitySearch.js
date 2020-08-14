import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../constants/NavConst';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { getRestaurants } from '../../redux/actions/restaurantsActions';

const ProximitySearch = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const getNearby = async () => {
    await dispatch(getRestaurants());
    navigation.navigate(Routes.Restaurants);
  };

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
