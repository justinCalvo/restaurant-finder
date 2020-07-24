import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Dimensions, Alert } from 'react-native';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import Expanded from '../../components/Details/Expanded';
import Photos from '../../components/Photos/Photos';
import Matches from '../../components/Matches/Matches';
import Details from '../../components/Details/Details';
import axios from 'axios';
import config from '../../../config';

const Restaurants = ({ route }) => {
  const [index, setIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [viewReviews, setViewReviews] = useState(false);
  const [customerRating, setCustomerRating] = useState([]);
  const [allCustomerRatings, setAllCustomerRatings] = useState([]);
  const [num, setNum] = useState(0);

  const MainAction = () => {
    if (route.params.restaurants[index + 1]) {
      getNext();
      setIndex(index + 1);
      setShowDetails(false);
      setViewReviews(false);
      setCustomerRating([]);
      setAllCustomerRatings([]);
      setNum(0);
    } else {
      // TODO: better ending to list
      Alert.alert('End of List');
    }
    if (index === 15 || index === 35) {
      getNextTwenty();
    }
  };

  // const RightActions = () => {
  // TODO: add selected data to database as a potential "match"
  // };

  const getNext = () => {
    if (route.params.restaurants[index + 2]) {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${
            route.params.restaurants[index + 2].place_id
          }&fields=formatted_phone_number,opening_hours/weekday_text,website,photo,reviews&key=${
            config.API_KEY
          }`,
        )
        .then(description => {
          let newRestaurants = route.params.restaurants;
          for (var key in description.data.result) {
            newRestaurants[index + 2][key] = description.data.result[key];
          }
          route.params.setRestaurants(newRestaurants);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const getNextTwenty = () => {
    if (index === 15 || index === 35) {
      let temp = route.params.restaurants;

      axios
        .get(
          `https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken=${
            route.params.nextPageToken
          }&key=${config.API_KEY}`,
        )
        .then(data => {
          route.params.setNextPageToken(data.data.next_page_token);
          const currentData = data.data.results;
          for (var i = 0; i < currentData.length; i++) {
            temp.push({
              formatted_phone_number: currentData[i].formatted_phone_number,
              website: currentData[i].website,
              name: currentData[i].name,
              rating: currentData[i].rating,
              price_level: currentData[i].price_level,
              formatted_address: currentData[i].formatted_address,
              place_id: currentData[i].place_id,
              user_ratings_total: currentData[i].user_ratings_total,
            });
          }
          route.params.setRestaurants(temp);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  console.log(index);
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
          <Photos
            index={index}
            photos={route.params.restaurants[index].photos}
            showDetails={showDetails}
          />
          <Details
            restaurants={route.params.restaurants}
            index={index}
            showDetails={showDetails}
          />
          <Expanded
            restaurants={route.params.restaurants}
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
