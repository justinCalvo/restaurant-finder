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

import { Sizes } from '../../constants/ResponsiveSizes';

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
  const photoSize = useSelector(state => state.photoSize);

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
      fontSize: Sizes.hp24,
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.text,
    },
    ratingContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: photoSize.photoSize,
    },
    ratingsTotalText: {
      paddingHorizontal: Sizes.hp5,
      fontSize: Sizes.hp14,
      color: colors.text,
    },
    text: {
      fontSize: Sizes.hp18,
      fontWeight: 'bold',
      color: colors.text,
    },
    contactContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingTop: Sizes.hp5,
      flexWrap: 'wrap',
      width: width,
    },
    addressContainer: {
      alignItems: 'center',
      paddingVertical: Sizes.hp5,
    },
    address: {
      width: Sizes.wp2_3rd,
    },
    addressText: {
      textAlign: 'center',
    },
    priceContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      width: photoSize.photoSize,
    },
    dayContainer: {
      paddingVertical: Sizes.hp5,
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
      paddingBottom: Sizes.hp5,
    },
    websiteContainer: {
      paddingHorizontal: Sizes.hp5,
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
            <Stars stars={stars} size={Sizes.hp25} />
          </View>
          <View style={styles.priceContainer}>
            <PriceRating index={index} size={Sizes.hp25} />
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
                <Icon name="call" size={Sizes.hp18} color="#cb3737" />
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
                <Icon name="globe-outline" size={Sizes.hp18} color="#cb3737" />
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
                <Icon name="globe-outline" size={Sizes.hp18} color="#cb3737" />
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
                <Icon name="call" size={Sizes.hp18} color="#cb3737" />
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
