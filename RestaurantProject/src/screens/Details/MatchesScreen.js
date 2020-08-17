import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setMatches } from '../../redux/actions/matchesActions';

import Matches from '../../components/Matches/Matches';

const MatchesScreen = ({ navigation }) => {
  const [displayMatches, setDisplayMatches] = useState({});

  const restaurants = useSelector(state => state.restaurants);
  const details = useSelector(state => state.details);
  const matches = useSelector(state => state.matches);
  const dispatch = useDispatch();

  useEffect(() => {
    const resetTabBarBadge = navigation.addListener('tabPress', e => {
      dispatch(setMatches(undefined, undefined, matches));

      let item,
        newMatches = [];

      for (item in matches.matches) {
        for (let i = 0; i < restaurants.restaurants.length; i++) {
          if (restaurants.restaurants[i].place_id === item) {
            newMatches.push({
              formatted_phone_number: details.details[i].formatted_phone_number,
              opening_hours: details.details[i].opening_hours,
              photos: details.details[i].photos,
              reviews: details.details[i].reviews,
              website: details.details[i].website,
              formatted_address: restaurants.restaurants[i].formatted_address,
              name: restaurants.restaurants[i].name,
              price_level: restaurants.restaurants[i].price_level,
              rating: restaurants.restaurants[i].rating,
              user_ratings_total: restaurants.restaurants[i].user_ratings_total,
            });
          }
        }
      }
      setDisplayMatches(newMatches);
    });
    return resetTabBarBadge;
  }, [details.details, dispatch, matches, navigation, restaurants.restaurants]);

  return (
    <SafeAreaView style={styles.container}>
      <Matches displayMatches={displayMatches} />
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
});

export default MatchesScreen;
