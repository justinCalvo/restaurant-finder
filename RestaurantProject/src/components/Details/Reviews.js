import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import PlusMinusButton from '../../utils/PlusMinusButton';

const Reviews = ({ index, viewReviews, setViewReviews }) => {
  const details = useSelector(state => state.details);

  return (
    <View style={styles.container}>
      {details.details[index].reviews ? (
        <View style={styles.viewReviewsContainer}>
          <PlusMinusButton
            bool={viewReviews}
            setBool={setViewReviews}
            buttonName="Reviews"
          />
        </View>
      ) : (
        <Text style={styles.reviews}>No Reviews</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
  },
  reviewDisplay: {
    display: 'flex',
  },
  reviewHide: {
    display: 'none',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  viewReviewsContainer: {
    paddingBottom: 10,
    height: 58,
    justifyContent: 'flex-end',
  },
});

export default Reviews;
