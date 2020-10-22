import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Sizes } from '../../constants/ResponsiveSizes';

import Expanded from '../../components/Details/Expanded';
import Reviews from '../../components/Details/Reviews';

import PriceRating from '../../utils/PriceRating';
import Stars from '../../utils/Stars';
import CurrentDay from '../../utils/CurrentDay';
import PoweredByGoogle from '../../utils/PoweredByGoogle';

const MatchDetails = ({ route }) => {
  const { stars, item } = route.params;

  const [num, setNum] = useState(0);

  const [showDetails, setShowDetails] = useState(false);
  const [viewReviews, setViewReviews] = useState(false);
  const [scrollReviewsToTop, setScrollReviewsToTop] = useState(false);

  const [customerRating, setCustomerRating] = useState([]);
  const [allCustomerRatings, setAllCustomerRatings] = useState([]);

  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      height: Sizes.hp_full,
    },
    photo: {
      width: Sizes.wp4_5th,
      height: Sizes.wp4_5th,
      marginLeft: Sizes.hp5,
      marginRight: Sizes.hp5,
    },
    placeName: {
      fontSize: Sizes.hp24,
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.text,
    },
    ratingContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingHorizontal: Sizes.hp10,
      paddingBottom: Sizes.hp5,
      alignItems: 'center',
      paddingTop: Sizes.hp5,
    },
    placeRating: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    priceContainer: {
      flexDirection: 'row',
    },
    ratingsTotalText: {
      paddingHorizontal: Sizes.hp5,
      fontSize: Sizes.hp14,
      color: colors.text,
    },
    dayContainer: {
      paddingVertical: Sizes.hp5,
    },
    contactContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
    },
    photoContainer: {
      paddingTop: Sizes.hp10,
      alignItems: 'center',
    },
    text: {
      fontSize: Sizes.hp18,
      fontWeight: 'bold',
      color: colors.text,
    },
    align: {
      flexDirection: 'row',
      paddingVertical: Sizes.hp5,
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
    nameContainer: {
      paddingTop: Sizes.hp20,
    },
    websiteContainer: {
      paddingHorizontal: Sizes.hp5,
    },
    poweredByGoogleOn: {
      flex: 1,
      justifyContent: 'flex-start',
    },
    poweredByGoogleOff: {
      flex: 1.8,
      justifyContent: 'flex-start',
    },
    condensed: {
      width: Sizes.wp_half,
      height: Sizes.wp_half,
    },
    reviewsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
    },
    expandedContainer: {
      flex: 4.2,
    },
    expandedContainerTwo: {
      flex: 1,
    },
    detailsContainer: {
      height: Sizes.hp1_3rd,
      justifyContent: 'center',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.placeName}>{item.name}</Text>
      </View>
      <View style={styles.ratingContainer}>
        <View style={styles.priceContainer}>
          <PriceRating priceLevel={item.price_level} size={Sizes.hp25} />
        </View>
        <View style={styles.placeRating}>
          <Text style={styles.ratingsTotalText}>
            ({item.user_ratings_total})
          </Text>
          <Stars stars={stars} next={item.nextStars} size={Sizes.hp25} />
        </View>
      </View>
      <View style={styles.photoContainer}>
        <Image
          style={showDetails ? styles.condensed : styles.photo}
          source={{ uri: item.photos[1].url }}
        />
      </View>
      <View style={!showDetails ? styles.detailsContainer : null}>
        {!showDetails ? (
          <View style={styles.dayContainer}>
            <CurrentDay openingHours={item.opening_hours.weekday_text} />
          </View>
        ) : null}
        <View style={styles.contactContainer}>
          {item.formatted_phone_number && !showDetails ? (
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(`tel:${item.formatted_phone_number}`)
              }>
              <View style={styles.align}>
                <View style={styles.websiteContainer}>
                  <Icon name="call" size={Sizes.hp18} color="#cb3737" />
                </View>
                <Text style={styles.text}>{item.formatted_phone_number}</Text>
              </View>
            </TouchableOpacity>
          ) : null}
          {item.website && !showDetails ? (
            <TouchableOpacity onPress={() => Linking.openURL(item.website)}>
              <View style={styles.align}>
                <View style={styles.websiteContainer}>
                  <Icon
                    name="globe-outline"
                    size={Sizes.hp18}
                    color="#cb3737"
                  />
                </View>
                <Text style={styles.text}>Website</Text>
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
        {!showDetails ? (
          <View style={styles.addressContainer}>
            <View style={styles.address}>
              <Text style={[styles.text, styles.addressText]}>
                {item.formatted_address}
              </Text>
            </View>
          </View>
        ) : null}
        {showDetails ? (
          <View style={styles.reviewsContainer}>
            <View>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(`tel:${item.formatted_phone_number}`)
                }>
                <View style={styles.align}>
                  <View style={styles.websiteContainer}>
                    <Icon name="call" size={Sizes.hp18} color="#cb3737" />
                  </View>
                  <Text style={styles.text}>{item.formatted_phone_number}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL(item.website)}>
                <View style={styles.align}>
                  <View style={styles.websiteContainer}>
                    <Icon
                      name="globe-outline"
                      size={Sizes.hp18}
                      color="#cb3737"
                    />
                  </View>
                  <Text style={styles.text}>Website</Text>
                </View>
              </TouchableOpacity>
            </View>
            <Reviews
              viewReviews={viewReviews}
              setViewReviews={setViewReviews}
              item={item}
            />
          </View>
        ) : null}
      </View>
      <View
        style={
          showDetails ? styles.expandedContainer : styles.expandedContainerTwo
        }>
        <Expanded
          showDetails={showDetails}
          setShowDetails={setShowDetails}
          viewReviews={viewReviews}
          setViewReviews={setViewReviews}
          customerRating={customerRating}
          setCustomerRating={setCustomerRating}
          allCustomerRatings={allCustomerRatings}
          setAllCustomerRatings={setAllCustomerRatings}
          num={num}
          setNum={setNum}
          scrollReviewsToTop={scrollReviewsToTop}
          setScrollReviewsToTop={setScrollReviewsToTop}
          item={item}
        />
      </View>
      <View
        style={
          showDetails ? styles.poweredByGoogleOn : styles.poweredByGoogleOff
        }>
        <PoweredByGoogle />
      </View>
    </SafeAreaView>
  );
};

export default MatchDetails;
