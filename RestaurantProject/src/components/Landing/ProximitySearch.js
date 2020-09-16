import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../constants/NavConst';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { getPlaceIds } from '../../redux/actions/currentLocationActions';

const ProximitySearch = ({
  isLoading,
  setIsLoading,
  min,
  max,
  meters,
  type,
  cuisines,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const getNearby = async () => {
    setIsLoading(true);
    await dispatch(getPlaceIds(min, max, meters, type, cuisines));
    navigation.navigate(Routes.ShareToken);
    setIsLoading(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={getNearby} title="Nearby Search">
        <Text style={styles.text}>
          <Icon name="navigate-sharp" size={24} color="#cb3737" /> Current
          Location
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
    color: '#1C2938',
  },
});

export default ProximitySearch;
