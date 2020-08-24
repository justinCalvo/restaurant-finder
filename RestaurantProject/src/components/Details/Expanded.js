import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import Reviews from './Reviews';
import { useSelector } from 'react-redux';

import LikeButton from '../../utils/LikeButton';
import DislikeButton from '../../utils/DislikeButton';

const Expanded = ({
  index,
  showDetails,
  setShowDetails,
  viewReviews,
  setViewReviews,
  customerRating,
  setCustomerRating,
  allCustomerRatings,
  setAllCustomerRatings,
  num,
  setNum,
  scrollReviewsToTop,
  setScrollReviewsToTop,
  MainAction,
  RightActions,
}) => {
  const details = useSelector(state => state.details);

  return (
    <FlingGestureHandler
      direction={Directions.UP}
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
          setShowDetails(true);
        }
      }}>
      <FlingGestureHandler
        direction={Directions.DOWN}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.ACTIVE) {
            setShowDetails(false);
          }
        }}>
        <View style={styles.container}>
          <View style={styles.bottomDragContainer}>
            {showDetails ? (
              <Text style={styles.description}>Hide Details</Text>
            ) : (
              <Text style={styles.description}>View Details</Text>
            )}
          </View>
          <View style={[showDetails ? styles.display : styles.hide]}>
            {!viewReviews ? (
              <Text style={[styles.scheduleText, styles.text]}>
                {details.details[index].opening_hours.weekday_text[0]}
                {'\n'}
                {details.details[index].opening_hours.weekday_text[1]}
                {'\n'}
                {details.details[index].opening_hours.weekday_text[2]}
                {'\n'}
                {details.details[index].opening_hours.weekday_text[3]}
                {'\n'}
                {details.details[index].opening_hours.weekday_text[4]}
                {'\n'}
                {details.details[index].opening_hours.weekday_text[5]}
                {'\n'}
                {details.details[index].opening_hours.weekday_text[6]}
              </Text>
            ) : null}
            <Reviews
              index={index}
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
            />
          </View>
          <View style={styles.scheduleWithButtonsContainer}>
            <LikeButton
              size={50}
              MainAction={MainAction}
              RightActions={RightActions}
            />
            <DislikeButton size={50} MainAction={MainAction} />
          </View>
        </View>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  display: {
    display: 'flex',
    width: width,
    flex: 1,
  },
  hide: {
    display: 'none',
  },
  description: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  text: {
    fontSize: 18,
  },
  scheduleText: {
    textAlign: 'center',
  },
  bottomDragContainer: {
    width: width / 1.5,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: 'black',
  },
  scheduleWithButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: width,
    paddingTop: 10,
  },
});

export default Expanded;
