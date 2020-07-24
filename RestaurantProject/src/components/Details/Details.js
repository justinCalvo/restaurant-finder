import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PriceRating from './PriceRating';

const Details = ({ restaurants, index, showDetails }) => {
  const [stars, setStars] = useState([]);

  const createStars = useCallback(() => {
    const afterDecimal = restaurants[index].rating.toString().slice(2);
    const wholeNumber = Math.floor(restaurants[index].rating);
    let starArray = [];

    for (var i = 1; i <= 5; i++) {
      if (i <= wholeNumber) {
        starArray.push('star');
      } else if (afterDecimal >= 8) {
        starArray.push('star');
      } else if (afterDecimal <= 7 && afterDecimal >= 3) {
        starArray.push('star-half');
      } else {
        starArray.push('star-border');
      }
    }
    setStars(starArray);
  }, [restaurants, index]);

  useEffect(() => {
    createStars();
  }, [createStars, restaurants]);

  return (
    <View style={styles.container}>
      <Text style={styles.restaurantName}>{restaurants[index].name}</Text>
      <View style={styles.contactContainer}>
        {restaurants[index].formatted_phone_number ? (
          <Text
            style={styles.text}
            onPress={() =>
              Linking.openURL(
                `tel:${restaurants[index].formatted_phone_number}`,
              )
            }>
            <Icon name="phone" size={15} />
            {restaurants[index].formatted_phone_number}
          </Text>
        ) : null}
        <Text
          onPress={() => Linking.openURL(restaurants[index].website)}
          style={[styles.website, styles.text]}>
          {restaurants[index].name}
        </Text>
      </View>
      {!showDetails ? (
        <>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingsTotalText}>
              ({restaurants[index].user_ratings_total})
            </Text>
            <Icon name={stars[0]} size={25} color="gold" />
            <Icon name={stars[1]} size={25} color="gold" />
            <Icon name={stars[2]} size={25} color="gold" />
            <Icon name={stars[3]} size={25} color="gold" />
            <Icon name={stars[4]} size={25} color="gold" />
          </View>
          <PriceRating restaurants={restaurants} index={index} />
          <Text>
            Address: {'\n'}
            {restaurants[index].formatted_address}
          </Text>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  restaurantName: {
    fontSize: 32,
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
});

export default Details;
