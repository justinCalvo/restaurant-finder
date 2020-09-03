import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Alert,
  BackHandler,
} from 'react-native';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import Expanded from '../../components/Details/Expanded';
import Photos from '../../components/Photos/Photos';
import Details from '../../components/Details/Details';

import PoweredByGoogle from '../../utils/PoweredByGoogle';

import { useDispatch, useSelector } from 'react-redux';
import { getDetails } from '../../redux/actions/detailsActions';
import { setMatches } from '../../redux/actions/matchesActions';
import { getNextTwenty } from '../../redux/actions/nextTwentyActions';

const Restaurants = ({ route, navigation }) => {
  const [index, setIndex] = useState(0);
  const [num, setNum] = useState(0);

  const [showDetails, setShowDetails] = useState(false);
  const [viewReviews, setViewReviews] = useState(false);
  const [scrollReviewsToTop, setScrollReviewsToTop] = useState(false);

  const [customerRating, setCustomerRating] = useState([]);
  const [allCustomerRatings, setAllCustomerRatings] = useState([]);

  const dispatch = useDispatch();

  const details = useSelector(state => state.details);
  const restaurants = useSelector(state => state.restaurants);
  const matches = useSelector(state => state.matches);

  const MainAction = async () => {
    if (restaurants.restaurants[index + 1]) {
      await dispatch(
        getDetails(details.details, restaurants.restaurants, index, undefined),
      );
      setIndex(index + 1);
      setShowDetails(false);
      setViewReviews(false);
      setCustomerRating([]);
      setAllCustomerRatings([]);
      setNum(0);
      setScrollReviewsToTop(true);
    } else {
      // TODO: better ending to list
      Alert.alert('End of List');
    }
    if (index === 15 || index === 35) {
      await dispatch(
        getNextTwenty(restaurants.restaurants, restaurants.nextPageToken),
      );
    }
  };

  const RightActions = async () => {
    await dispatch(
      setMatches(restaurants.restaurants, details.details, index, matches),
    );
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'YES', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

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
            RightActions();
            MainAction();
          }
        }}>
        <SafeAreaView style={styles.container}>
          <Photos index={index} showDetails={showDetails} />
          <Details
            index={index}
            showDetails={showDetails}
            viewReviews={viewReviews}
            setViewReviews={setViewReviews}
          />
          <Expanded
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
            scrollReviewsToTop={scrollReviewsToTop}
            setScrollReviewsToTop={setScrollReviewsToTop}
            MainAction={MainAction}
            RightActions={RightActions}
          />
          <PoweredByGoogle />
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
    backgroundColor: '#fafafa',
  },
});

export default Restaurants;
