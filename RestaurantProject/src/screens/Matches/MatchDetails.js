import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

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

  const { width, height } = Dimensions.get('window');
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      width: width,
      height: height,
    },
    photo: {
      width: width / 1.3,
      height: width / 1.3,
      marginLeft: 5,
      marginRight: 5,
    },
    placeName: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.text,
    },
    ratingContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingHorizontal: 10,
      paddingBottom: 5,
      alignItems: 'center',
      paddingTop: 5,
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
      paddingHorizontal: 5,
      fontSize: 16,
      color: colors.text,
    },
    dayContainer: {
      paddingVertical: 5,
    },
    contactContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
    },
    photoContainer: {
      paddingTop: 10,
      alignItems: 'center',
      width: width,
    },
    text: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
    },
    align: {
      flexDirection: 'row',
      paddingVertical: 5,
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
    nameContainer: {
      paddingTop: 20,
    },
    websiteContainer: {
      paddingHorizontal: 5,
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
      width: (width - 10) / 2,
      height: (width - 10) / 2,
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
      height: height / 3,
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
          <PriceRating priceLevel={item.price_level} size={25} />
        </View>
        <View style={styles.placeRating}>
          <Text style={styles.ratingsTotalText}>
            ({item.user_ratings_total})
          </Text>
          <Stars stars={stars} next={item.nextStars} size={25} />
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
                  <Icon name="call" size={18} color="#cb3737" />
                </View>
                <Text style={styles.text}>{item.formatted_phone_number}</Text>
              </View>
            </TouchableOpacity>
          ) : null}
          {item.website && !showDetails ? (
            <TouchableOpacity onPress={() => Linking.openURL(item.website)}>
              <View style={styles.align}>
                <View style={styles.websiteContainer}>
                  <Icon name="globe-outline" size={18} color="#cb3737" />
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
                    <Icon name="call" size={18} color="#cb3737" />
                  </View>
                  <Text style={styles.text}>{item.formatted_phone_number}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL(item.website)}>
                <View style={styles.align}>
                  <View style={styles.websiteContainer}>
                    <Icon name="globe-outline" size={18} color="#cb3737" />
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
