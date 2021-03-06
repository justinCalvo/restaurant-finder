import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
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

const MainScreen = () => {
  const [index, setIndex] = useState(0);
  const [num, setNum] = useState(0);
  const [swiped, setSwiped] = useState(false);

  const [showDetails, setShowDetails] = useState(false);
  const [viewReviews, setViewReviews] = useState(false);
  const [scrollReviewsToTop, setScrollReviewsToTop] = useState(false);

  const [customerRating, setCustomerRating] = useState([]);
  const [allCustomerRatings, setAllCustomerRatings] = useState([]);

  const dispatch = useDispatch();

  const details = useSelector(state => state.details);
  const places = useSelector(state => state.places);
  const matches = useSelector(state => state.matches);

  const MainAction = async () => {
    if (places.placeIds[index + 1]) {
      await dispatch(
        getDetails(details.details, places.placeIds, index, undefined),
      );
      setIndex(index + 1);
      setShowDetails(false);
      setViewReviews(false);
      setCustomerRating([]);
      setAllCustomerRatings([]);
      setNum(0);
      setScrollReviewsToTop(true);
      setSwiped(false);
    } else {
      // TODO: better ending to list
      Alert.alert('End of List');
    }
    if (index === 15 || index === 35) {
      await dispatch(
        getNextTwenty(places.placeIds, places.nextPageToken, places.sessionID),
      );
    }
  };

  const RightActions = async () => {
    if (!swiped) {
      await setSwiped(true);
      await dispatch(
        setMatches(
          places.placeIds,
          details.details,
          index,
          matches,
          places.sessionID,
        ),
      );
      await MainAction();
    }
  };

  const LeftActions = async () => {
    if (!swiped) {
      await setSwiped(true);
      await MainAction();
    }
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
          LeftActions();
        }
      }}>
      <FlingGestureHandler
        direction={Directions.RIGHT}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.ACTIVE) {
            RightActions();
          }
        }}>
        <SafeAreaView style={styles.container}>
          <View style={styles.photoContainer}>
            <Photos index={index} showDetails={showDetails} />
          </View>
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
            LeftActions={LeftActions}
            RightActions={RightActions}
          />
          <PoweredByGoogle />
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photoContainer: {
    alignItems: 'center',
  },
});

export default MainScreen;
