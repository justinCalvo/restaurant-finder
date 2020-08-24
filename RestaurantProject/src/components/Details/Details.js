import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Linking, Dimensions } from 'react-native';
import { createStars } from '../../helper/CreateStars';
import { useSelector } from 'react-redux';

import PriceRating from '../../utils/PriceRating';
import Stars from '../../utils/Stars';
import CurrentDay from '../../utils/CurrentDay';

import Icon from 'react-native-vector-icons/Ionicons';

const Details = ({ index, showDetails, MainAction, RightActions }) => {
  const [stars, setStars] = useState([]);
  const restaurants = useSelector(state => state.restaurants);
  const details = useSelector(state => state.details);

  useEffect(() => {
    createStars(undefined, restaurants.restaurants[index], setStars);
  }, [index, restaurants.restaurants]);

  return (
    <View style={styles.container}>
      {!showDetails ? (
        <>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingsTotalText}>
              ({restaurants.restaurants[index].user_ratings_total})
            </Text>
            <Stars stars={stars} size={25} />
          </View>
          <View style={styles.priceContainer}>
            <PriceRating index={index} size={25} />
          </View>
        </>
      ) : null}
      <Text style={styles.restaurantName}>
        {restaurants.restaurants[index].name}
      </Text>
      {!showDetails ? <CurrentDay index={index} /> : null}
      <View style={styles.contactContainer}>
        {details.details[index].formatted_phone_number ? (
          <Text
            style={styles.text}
            onPress={() =>
              Linking.openURL(
                `tel:${details.details[index].formatted_phone_number}`,
              )
            }>
            <Icon name="call" size={18} />
            {details.details[index].formatted_phone_number}
          </Text>
        ) : null}
        <Text
          onPress={() => Linking.openURL(details.details[index].website)}
          style={[styles.website, styles.text]}>
          {restaurants.restaurants[index].name}
        </Text>
      </View>
      {!showDetails ? (
        <>
          <View style={styles.addressContainer}>
            <View style={styles.address}>
              <Text style={[styles.text, styles.addressText]}>
                {restaurants.restaurants[index].formatted_address}
              </Text>
            </View>
          </View>
        </>
      ) : null}
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
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
  ratingsTotalText: {
    paddingHorizontal: 5,
    fontSize: 16,
  },
  text: {
    fontSize: 18,
  },
  website: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    flexWrap: 'wrap',
  },
  addressContainer: {
    alignItems: 'center',
    paddingVertical: 5,
  },
  address: {
    width: width / 1.5,
  },
  addressText: {
    textAlign: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  dayContainer: {
    paddingVertical: 5,
  },
});

export default Details;
