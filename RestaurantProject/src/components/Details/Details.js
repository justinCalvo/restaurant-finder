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
import { useTheme } from '@react-navigation/native';
import Reviews from './Reviews';

import PriceRating from '../../utils/PriceRating';
import Stars from '../../utils/Stars';
import CurrentDay from '../../utils/CurrentDay';

import Icon from 'react-native-vector-icons/Ionicons';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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

  const details = useSelector(state => state.details);

  useEffect(() => {
    createStars(undefined, details.details[index], setStars);
  }, [index, details.details]);

  const { colors } = useTheme();

  const { width } = Dimensions.get('window');

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    placeName: {
      fontSize: hp('2.7%'),
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.text,
    },
    ratingContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: wp('77%'),
    },
    ratingsTotalText: {
      paddingHorizontal: hp('0.6%'),
      fontSize: hp('1.6%'),
      color: colors.text,
    },
    text: {
      fontSize: hp('2%'),
      fontWeight: 'bold',
      color: colors.text,
    },
    contactContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingTop: hp('0.6%'),
      flexWrap: 'wrap',
      width: width,
    },
    addressContainer: {
      alignItems: 'center',
      paddingVertical: hp('0.6%'),
    },
    address: {
      width: wp('67%'),
    },
    addressText: {
      textAlign: 'center',
    },
    priceContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      width: wp('77%'),
    },
    dayContainer: {
      paddingVertical: hp('0.6%'),
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
      paddingBottom: hp('0.6%'),
    },
    websiteContainer: {
      paddingHorizontal: hp('0.6%'),
    },
  });

  return (
    <View style={styles.container}>
      {!showDetails ? (
        <>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingsTotalText}>
              ({details.details[index].user_ratings_total})
            </Text>
            <Stars stars={stars} size={hp('2.8%')} />
          </View>
          <View style={styles.priceContainer}>
            <PriceRating index={index} size={hp('2.8%')} />
          </View>
        </>
      ) : null}
      <Text style={styles.placeName}>{details.details[index].name}</Text>
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
                <Icon name="call" size={hp('2%')} color="#cb3737" />
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
                <Icon name="globe-outline" size={hp('2%')} color="#cb3737" />
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
                <Icon name="globe-outline" size={hp('2%')} color="#cb3737" />
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
                <Icon name="call" size={hp('2%')} color="#cb3737" />
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
                {details.details[index].formatted_address}
              </Text>
            </View>
          </View>
        </>
      ) : null}
    </View>
  );
};

export default Details;
