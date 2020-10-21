import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

import { useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SelectedCuisines = ({ handleToggle }) => {
  const query = useSelector(state => state.query);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.cuisines}>
        <TouchableOpacity onPress={() => handleToggle(item.cuisine)}>
          <View style={styles.deleteCuisine}>
            <Text style={styles.text}>{item.cuisine}</Text>
            <Icon name="close" size={hp('2%')} color="#cb3737" />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
    cuisineListContainer: {
      alignItems: 'center',
      paddingBottom: hp('1.1%'),
    },
    cuisines: {
      alignItems: 'center',
      width: wp('33.3%'),
    },
    text: {
      fontSize: hp('1.6%'),
      fontWeight: 'bold',
      color: colors.text,
    },
    deleteCuisine: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: wp('0.25%'),
      borderColor: colors.text,
      borderRadius: hp('2.3%'),
      marginTop: hp('1.1%'),
      paddingHorizontal: hp('0.6%'),
    },
  });

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.cuisineListContainer}
        data={query.cuisineList}
        ref={ref => {
          this.flatListRef = ref;
        }}
        keyExtractor={(item, index) => index}
        renderItem={renderItem}
        numColumns={2}
      />
    </View>
  );
};

export default SelectedCuisines;
