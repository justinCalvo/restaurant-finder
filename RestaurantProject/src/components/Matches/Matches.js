import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../constants/NavConst';
import { useSelector } from 'react-redux';
// import { getDetails } from '../../redux/actions/detailsActions';

const Matches = () => {
  // const dispatch = useDispatch();
  const navigation = useNavigation();
  const rest = useSelector(state => state.restaurants);
  const deet = useSelector(state => state.details);

  const openModal = () => {
    navigation.navigate(Routes.MatchesModal);
  };
  // console.log('restaurante', rest);
  // console.log('give me the ', deet);

  // useEffect(() => {
  //   if (state.details.length === 0) {
  //     dispatch(getDetails([], state.restaurants, 0));
  //   }
  // }, [state.details]);

  return (
    <FlingGestureHandler
      direction={Directions.DOWN}
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
          openModal();
        }
      }}>
      <View style={styles.container}>
        <Text style={styles.banner}>lol</Text>
      </View>
    </FlingGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  banner: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Matches;
