import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
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
              <Stars stars={stars} next={item.nextStars} size={20} />
            </View>
            <View style={styles.priceContainer}>
              <PriceRating priceLevel={item.price_level} size={18} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const { width, height } = Dimensions.get('window');
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    condensed: {
      width: width / 5,
      height: width / 5,
    },
    matchContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 15,
      paddingHorizontal: 40,
    },
    image: {
      borderRadius: 40,
    },
    text: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.text,
    },
    detailsContainer: {
      width: width / 2,
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
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    listContainer: {
      height: height / 1.3,
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
