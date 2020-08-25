import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Reviews = ({ index, viewReviews, setViewReviews }) => {
  const [buttonTitle, setButtonTitle] = useState('View Reviews');
  const details = useSelector(state => state.details);

  const checkViewState = useCallback(() => {
    if (viewReviews) {
      setButtonTitle('minus');
    } else {
      setButtonTitle('plus');
    }
  }, [viewReviews]);

  const handleViewReviews = useCallback(() => {
    if (!viewReviews) {
      setViewReviews(true);
    } else {
      setViewReviews(false);
    }
  }, [setViewReviews, viewReviews]);

  useEffect(() => {
    checkViewState();
  }, [checkViewState, viewReviews, details.details]);

  return (
    <View style={styles.container}>
      {details.details[index].reviews ? (
        <View style={styles.viewReviewsContainer}>
          <TouchableOpacity onPress={handleViewReviews}>
            <View style={styles.viewContainer}>
              <FontAwesome name={buttonTitle} size={15} color="#cb3737" />
              <View style={styles.reviewContainer}>
                <Text style={[styles.reviews, styles.reviewsTouchable]}>
                  Reviews
                </Text>
              </View>
            </View>
          </TouchableOpacity>
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
  reviews: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  reviewsTouchable: {
    color: '#1C2938',
  },
  viewReviewsContainer: {
    paddingBottom: 10,
    height: 58,
    justifyContent: 'flex-end',
  },
  viewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewContainer: {
    paddingRight: 10,
    paddingLeft: 5,
  },
});

export default Reviews;
