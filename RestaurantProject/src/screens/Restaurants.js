import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import RestaurantInfo from '../components/RestaurantInfo';
import Photos from '../components/Photos';
import Matches from '../components/Matches';
import Details from '../components/Details';
import axios from 'axios';
import config from '../../config';

const Restaurants = ({ route }) => {
  const [index, setIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [viewReviews, setViewReviews] = useState(false);
  const [customerRating, setCustomerRating] = useState([]);
  const [allCustomerRatings, setAllCustomerRatings] = useState([]);
  const [num, setNum] = useState(0);

  const MainAction = () => {
    getNext();
    setIndex(index + 1);
    setShowDetails(false);
    setViewReviews(false);
    setCustomerRating([]);
    setAllCustomerRatings([]);
    setNum(0);
  };

  // const RightActions = () => {
  // TODO: add selected data to database as a potential "match"
  // };

  const getNext = () => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${
          route.params.restaurants[index + 2].place_id
        }&fields=formatted_phone_number,opening_hours,website,photo,reviews&key=${
          config.API_KEY
        }`,
      )
      .then(description => {
        route.params.setPlaceDetails(oldArray => [
          ...oldArray,
          description.data.result,
        ]);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <FlingGestureHandler
      direction={Directions.LEFT}
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
          MainAction();
        }
      }}>
      <FlingGestureHandler
        direction={Directions.RIGHT}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.ACTIVE) {
            MainAction();
            // RightActions();
          }
        }}>
        <SafeAreaView style={styles.container}>
          <Matches index={index} />
          <Photos index={index}
            photos={route.params.placeDetails[index].photos}
            showDetails={showDetails}
          />
          <RestaurantInfo
            restaurants={route.params.restaurants}
            index={index}
            placeDetails={route.params.placeDetails}
            showDetails={showDetails}
          />
          <Details
            restaurants={route.params.restaurants}
            placeDetails={route.params.placeDetails}
            setPlaceDetails={route.params.setPlaceDetails}
            index={index}
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
          />
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Restaurants;
