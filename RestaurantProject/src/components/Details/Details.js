import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Linking,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { createStars } from '../../helper/CreateStars';
import { useSelector } from 'react-redux';
import Reviews from './Reviews';

import PriceRating from '../../utils/PriceRating';
import Stars from '../../utils/Stars';
import CurrentDay from '../../utils/CurrentDay';

import Icon from 'react-native-vector-icons/Ionicons';

const Details = ({
  index,
  showDetails,
  MainAction,
  RightActions,
  viewReviews,
  setViewReviews,
  customerRating,
  setCustomerRating,
  allCustomerRatings,
  setAllCustomerRatings,
}) => {
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
        {details.details[index].formatted_phone_number && !showDetails ? (
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                `tel:${details.details[index].formatted_phone_number}`,
              )
            }>
            <View style={styles.align}>
              <View style={styles.websiteContainer}>
                <Icon name="call" size={18} color="#cb3737" />
              </View>
              <Text style={styles.text}>
                {details.details[index].formatted_phone_number}
              </Text>
            </View>
          </TouchableOpacity>
        ) : null}
        {details.details[index].website && !showDetails ? (
          <TouchableOpacity
            onPress={() => Linking.openURL(details.details[index].website)}>
            <View style={styles.align}>
              <View style={styles.websiteContainer}>
                <Icon name="globe-outline" size={18} color="#cb3737" />
              </View>
              <Text style={styles.text}>Website</Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.whileViewingDetails}>
        <View>
          {details.details[index].website && showDetails ? (
            <TouchableOpacity
              onPress={() => Linking.openURL(details.details[index].website)}>
              <View style={[styles.align, styles.website]}>
                <Icon name="globe-outline" size={18} color="#cb3737" />
                <View style={styles.websiteContainer}>
                  <Text style={styles.text}>Website</Text>
                </View>
              </View>
            </TouchableOpacity>
          ) : null}
          {details.details[index].formatted_phone_number && showDetails ? (
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  `tel:${details.details[index].formatted_phone_number}`,
                )
              }>
              <View style={styles.align}>
                <Icon name="call" size={18} color="#cb3737" />
                <View style={styles.websiteContainer}>
                  <Text style={styles.text}>
                    {details.details[index].formatted_phone_number}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
        {showDetails ? (
          <Reviews
            index={index}
            viewReviews={viewReviews}
            setViewReviews={setViewReviews}
          />
        ) : null}
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
    alignItems: 'center',
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1C2938',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: width / 1.3,
  },
  ratingsTotalText: {
    paddingHorizontal: 5,
    fontSize: 16,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C2938',
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 5,
    flexWrap: 'wrap',
    width: width,
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
    width: width / 1.3,
  },
  dayContainer: {
    paddingVertical: 5,
  },
  whileViewingDetails: {
    flexDirection: 'row',
    width: width,
    justifyContent: 'space-around',
  },
  align: {
    flexDirection: 'row',
  },
  website: {
    paddingBottom: 5,
  },
  websiteContainer: {
    paddingHorizontal: 5,
  },
});

export default Details;
