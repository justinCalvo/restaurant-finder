import React from 'react';
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
import PriceRating from '../../utils/PriceRating';
import Stars from '../../utils/Stars';
import CurrentDay from '../../utils/CurrentDay';
import Icon from 'react-native-vector-icons/Ionicons';

const MatchDetails = ({ route }) => {
  const { stars, item } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.restaurantName}>{item.name}</Text>
      </View>
      <View style={styles.ratingContainer}>
        <View style={styles.priceContainer}>
          <PriceRating priceLevel={item.price_level} size={25} />
        </View>
        <View style={styles.restaurantRating}>
          <Text style={styles.ratingsTotalText}>
            ({item.user_ratings_total})
          </Text>
          <Stars stars={stars} next={item.nextStars} size={25} />
        </View>
      </View>
      <View style={styles.photoContainer}>
        <Image style={styles.photo} source={{ uri: item.photos[1].url }} />
      </View>
      <View style={styles.dayContainer}>
        <CurrentDay openingHours={item.opening_hours.weekday_text} />
      </View>
      <View style={styles.contactContainer}>
        {item.formatted_phone_number ? (
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
        {item.website ? (
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
      <View style={styles.addressContainer}>
        <View style={styles.address}>
          <Text style={[styles.text, styles.addressText]}>
            {item.formatted_address}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: '#fafafa',
  },
  photo: {
    width: width / 1.3,
    height: width / 1.3,
    marginLeft: 5,
    marginRight: 5,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1C2938',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingBottom: 5,
    alignItems: 'center',
    paddingTop: 5,
  },
  restaurantRating: {
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
  },
  dayContainer: {
    paddingVertical: 5,
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    flexWrap: 'wrap',
  },
  photoContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    width: width,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C2938',
  },
  align: {
    flexDirection: 'row',
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
});

export default MatchDetails;
