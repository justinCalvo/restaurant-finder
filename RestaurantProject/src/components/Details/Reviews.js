import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import PlusMinusButton from '../../utils/PlusMinusButton';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Sizes } from '../../constants/ResponsiveSizes';

const Reviews = ({ index, viewReviews, setViewReviews, item }) => {
  const details = useSelector(state => state.details);
  const theDetails = item ? item : details.details[index];

  return (
    <View style={styles.container}>
      {theDetails.reviews ? (
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
    paddingBottom: Sizes.hp10,
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
    paddingBottom: Sizes.hp10,
    height: hp('6.5%'),
    justifyContent: 'flex-end',
  },
});

export default Reviews;
