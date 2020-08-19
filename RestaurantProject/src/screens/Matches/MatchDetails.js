import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const MatchDetails = ({ route }) => {
  const { stars, item } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.photo} source={{ uri: item.photos[1].url }} />
      <Text style={styles.restaurantName}>{item.name}</Text>
      <View style={styles.ratingContainer}>
        <Icon name={stars[item.nextStars][0]} size={25} color="gold" />
        <Icon name={stars[item.nextStars][1]} size={25} color="gold" />
        <Icon name={stars[item.nextStars][2]} size={25} color="gold" />
        <Icon name={stars[item.nextStars][3]} size={25} color="gold" />
        <Icon name={stars[item.nextStars][4]} size={25} color="gold" />
      </View>
      <View style={styles.priceContainer}>
        <FontAwesome
          name="dollar"
          size={25}
          color="black"
          style={
            item.price_level >= 1 ? styles.showDollarOne : styles.hideDollarOne
          }
        />
        <FontAwesome
          name="dollar"
          size={25}
          color="black"
          style={
            item.price_level >= 2 ? styles.showDollarTwo : styles.hideDollarTwo
          }
        />
        <FontAwesome
          name="dollar"
          size={25}
          color="black"
          style={
            item.price_level >= 3
              ? styles.showDollarThree
              : styles.hideDollarThree
          }
        />
        <FontAwesome
          name="dollar"
          size={25}
          color="black"
          style={
            item.price_level >= 4
              ? styles.showDollarFour
              : styles.hideDollarFour
          }
        />
      </View>
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

  showDollarOne: {
    display: 'flex',
  },
  hideDollarOne: {
    display: 'none',
  },
  showDollarTwo: {
    display: 'flex',
  },
  hideDollarTwo: {
    display: 'none',
  },
  showDollarThree: {
    display: 'flex',
  },
  hideDollarThree: {
    display: 'none',
  },
  showDollarFour: {
    display: 'flex',
  },
  hideDollarFour: {
    display: 'none',
  },
});

export default MatchDetails;
