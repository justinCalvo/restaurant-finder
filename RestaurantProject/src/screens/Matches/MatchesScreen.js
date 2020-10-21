import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

import { useSelector } from 'react-redux';
import { useNavigation, useTheme } from '@react-navigation/native';
import { Routes } from '../../constants/NavConst';

import PriceRating from '../../utils/PriceRating';
import Stars from '../../utils/Stars';
import PoweredByGoogle from '../../utils/PoweredByGoogle';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const MatchesScreen = ({ stars }) => {
  const navigation = useNavigation();
  const displayMatches = useSelector(state => state.matches);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(Routes.MatchDetails, {
            item: item,
            stars: stars,
          });
        }}>
        <View style={styles.matchContainer}>
          <Image
            style={[styles.condensed, styles.image]}
            source={{ uri: item.photos[1].url }}
          />
          <View style={styles.detailsContainer}>
            {item.name.length >= 25 ? (
              <Text style={styles.text}>{item.name.slice(0, 25)}...</Text>
            ) : (
              <Text style={styles.text}>{item.name}</Text>
            )}
            <View style={styles.ratingContainer}>
              <Stars stars={stars} next={item.nextStars} size={hp('2.3%')} />
            </View>
            <View style={styles.priceContainer}>
              <PriceRating priceLevel={item.price_level} size={hp('2%')} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const { colors } = useTheme();

  const styles = StyleSheet.create({
    condensed: {
      width: wp('20%'),
      height: wp('20%'),
    },
    matchContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: hp('1.7%'),
      paddingHorizontal: hp('4.5%'),
    },
    image: {
      borderRadius: hp('4.5%'),
    },
    text: {
      fontSize: hp('1.6%'),
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.text,
    },
    detailsContainer: {
      width: wp('50%'),
      alignItems: 'flex-end',
    },
    priceContainer: {
      flexDirection: 'row',
    },
    ratingContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    display: {
      display: 'flex',
      marginBottom: hp('1.1%'),
      paddingHorizontal: hp('1.1%'),
    },
    listContainer: {
      height: hp('77%'),
    },
  });

  return (
    <>
      <View style={styles.listContainer}>
        <FlatList
          style={styles.display}
          data={displayMatches.displayMatches}
          keyExtractor={item => item.nextStars.toString()}
          extraData={stars}
          renderItem={renderItem}
        />
      </View>
      <View>
        <PoweredByGoogle />
      </View>
    </>
  );
};

export default MatchesScreen;
