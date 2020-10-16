import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Dimensions, Alert } from 'react-native';
import MatchesScreen from '../../screens/Matches/MatchesScreen';

import { createStars } from '../../helper/CreateStars';
import { useSelector, useDispatch } from 'react-redux';
import { setMatches } from '../../redux/actions/matchesActions';

const Matches = ({ navigation }) => {
  const [stars, setStars] = useState([]);

  const matches = useSelector(state => state.matches);
  const displayMatches = useSelector(state => state.matches);
  const dispatch = useDispatch();

  useEffect(() => {
    const resetTabBarBadge = navigation.addListener('tabPress', e => {
      if (displayMatches.displayMatches.length > 0) {
        dispatch(setMatches(undefined, undefined, undefined, matches));
      } else {
        e.preventDefault();
        Alert.alert('Keep Swiping!', 'No matches found yet!');
      }
    });
    return resetTabBarBadge;
  }, [dispatch, displayMatches, matches, navigation]);

  const sendCreateStars = useCallback(() => {
    createStars(displayMatches.displayMatches, undefined, setStars);
  }, [displayMatches]);

  useEffect(() => {
    sendCreateStars();
  }, [sendCreateStars, matches.matches]);

  return (
    <View style={styles.container}>
      {stars.length === displayMatches.displayMatches.length ? (
        <MatchesScreen stars={stars} />
      ) : null}
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
  },
});

export default Matches;
