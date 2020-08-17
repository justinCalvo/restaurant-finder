import React, { useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setMatches } from '../../redux/actions/matchesActions';

const MatchesScreen = ({ navigation }) => {
  const matches = useSelector(state => state.matches);
  const dispatch = useDispatch();
  console.log(matches.matches);

  useEffect(() => {
    const resetTabBarBadge = navigation.addListener('tabPress', e => {
      dispatch(setMatches(undefined, undefined, matches));
    });

    return resetTabBarBadge;
  }, [dispatch, matches, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello</Text>
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
