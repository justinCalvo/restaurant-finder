import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import ReviewScreen from '../screens/ReviewScreen';

const Reviews = ({
  placeDetails,
  index,
  viewReviews,
  setViewReviews,
  customerRating,
  setCustomerRating,
  allCustomerRatings,
  setAllCustomerRatings,
  num,
  setNum,
}) => {
  const [buttonTitle, setButtonTitle] = useState('View Reviews');
  const [reviewData, setReviewData] = useState([]);

  const updateReviewData = useCallback(() => {
    let temp = [];
    let nextNumber = 0;
    if (placeDetails[index].reviews) {
      placeDetails[index].reviews.forEach(item => {
        temp.push({
          author_name: item.author_name,
          rating: item.rating,
          relative_time_description: item.relative_time_description,
          text: item.text,
          next: nextNumber,
        });
        nextNumber++;
      });
      setReviewData(temp);
    }
  }, [placeDetails, index, setReviewData]);

  const checkViewState = useCallback(() => {
    if (viewReviews) {
      setButtonTitle('Hide Reviews');
    } else {
      setButtonTitle('View Reviews');
    }
  }, [viewReviews]);

  const allRatings = useCallback(() => {
    let temp = [];
    if (placeDetails[index].reviews) {
      placeDetails[index].reviews.forEach(item => {
        temp.push(item.rating);
      });
      setAllCustomerRatings(temp);
    }
  }, [placeDetails, index, setAllCustomerRatings]);

  const handleViewReviews = useCallback(() => {
    if (!viewReviews) {
      setViewReviews(true);
    } else {
      setViewReviews(false);
    }
  }, [setViewReviews, viewReviews]);

  const createStars = useCallback(() => {
    const wholeNumber = allCustomerRatings[num]
      ? allCustomerRatings[num]
      : null;
    let customerRatingArray = [];
    if (wholeNumber) {
      for (var i = 1; i <= 5; i++) {
        if (i <= wholeNumber) {
          customerRatingArray.push('star');
        } else {
          customerRatingArray.push('star-border');
        }
      }
      setCustomerRating(oldArray => [...oldArray, customerRatingArray]);
      setNum(num + 1);
    }
  }, [allCustomerRatings, num, setCustomerRating, setNum]);

  useEffect(() => {
    createStars();
  }, [createStars, allRatings, placeDetails, viewReviews]);

  useEffect(() => {
    checkViewState();
    allRatings();
  }, [allRatings, checkViewState, viewReviews, placeDetails]);

  useEffect(() => {
    updateReviewData();
  }, [updateReviewData, placeDetails]);

  return (
    <View style={styles.container}>
      {placeDetails[index].reviews ? (
        <Button title={buttonTitle} onPress={handleViewReviews} />
      ) : (
        <Text style={styles.noReviews}>No Reviews</Text>
      )}
      {customerRating ? (
        <ReviewScreen
          customerRating={customerRating}
          placeDetails={placeDetails}
          allRatings={allRatings}
          num={num}
          viewReviews={viewReviews}
          index={index}
          reviewData={reviewData}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  reviewDisplay: {
    display: 'flex',
  },
  reviewHide: {
    display: 'none',
  },
  noReviews: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default Reviews;
