import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import PriceRating from '../../components/Details/PriceRating';
import Stars from '../../components/Details/Stars';
import Icon from 'react-native-vector-icons/Ionicons';

const MatchDetails = ({ route }) => {
  const { stars, item } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.photo} source={{ uri: item.photos[1].url }} />
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingsTotalText}>({item.user_ratings_total})</Text>
        <Stars stars={stars} next={item.nextStars} size={25} />
      </View>
      <View style={styles.priceContainer}>
        <PriceRating priceLevel={item.price_level} size={25} />
      </View>
      <Text style={styles.restaurantName}>{item.name}</Text>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: 'white',
  },
  photo: {
    width: width - 10,
    height: width - 10,
    marginLeft: 5,
    marginRight: 5,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  ratingsTotalText: {
    paddingHorizontal: 5,
    fontSize: 16,
  },
});

export default MatchDetails;
