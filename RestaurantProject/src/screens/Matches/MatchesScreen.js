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

import { Sizes } from '../../constants/ResponsiveSizes';

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
              <Stars stars={stars} next={item.nextStars} size={Sizes.hp20} />
            </View>
            <View style={styles.priceContainer}>
              <PriceRating priceLevel={item.price_level} size={Sizes.hp18} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const { colors } = useTheme();

  const styles = StyleSheet.create({
    condensed: {
      width: Sizes.wp1_5th,
      height: Sizes.wp1_5th,
    },
    matchContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: Sizes.hp15,
      paddingHorizontal: Sizes.hp40,
    },
    image: {
      borderRadius: Sizes.hp40,
    },
    text: {
      fontSize: Sizes.hp14,
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.text,
    },
    detailsContainer: {
      width: Sizes.wp_half,
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
      marginBottom: Sizes.hp10,
      paddingHorizontal: Sizes.hp10,
    },
    listContainer: {
      flex: 1,
    },
    flatListContainer: {
      flex: 2,
    },
    poweredByGoogleContainer: {
      flex: 0.1,
      width: Sizes.wp_full,
    },
  });

  return (
    <View style={styles.listContainer}>
      <View style={styles.flatListContainer}>
        <FlatList
          style={styles.display}
          data={displayMatches.displayMatches}
          keyExtractor={item => item.nextStars.toString()}
          extraData={stars}
          renderItem={renderItem}
        />
      </View>
      <View style={styles.poweredByGoogleContainer}>
        <PoweredByGoogle />
      </View>
    </View>
  );
};

export default MatchesScreen;
