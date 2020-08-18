import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { createStars } from '../../services/CreateStars';
import MatchesScreen from '../../screens/Details/MatchesScreen';
import { useSelector, useDispatch } from 'react-redux';
import { setMatches } from '../../redux/actions/matchesActions';

const Matches = ({ navigation }) => {
  const [stars, setStars] = useState([]);

  const matches = useSelector(state => state.matches);
  const displayMatches = useSelector(state => state.matches);
  const dispatch = useDispatch();

  useEffect(() => {
    const resetTabBarBadge = navigation.addListener('tabPress', e => {
      dispatch(setMatches(undefined, undefined, undefined, matches));
    });
    return resetTabBarBadge;
  }, [dispatch, matches, navigation]);

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
    backgroundColor: 'white',
  },
});

export default Matches;
