import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import PriceRating from '../../utils/PriceRating';
import Stars from '../../utils/Stars';

const MatchesScreen = ({ stars }) => {
  const navigation = useNavigation();
  const displayMatches = useSelector(state => state.matches);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MatchDetails', {
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

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.display}
        data={displayMatches.displayMatches}
        keyExtractor={item => item.nextStars.toString()}
        extraData={stars}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
  },
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
    marginBottom: 170,
    paddingHorizontal: 10,
  },
});

export default MatchesScreen;
