import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ReviewScreen from '../../screens/Details/ReviewScreen';
import { useSelector } from 'react-redux';

const Reviews = ({
  index,
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
}) => {
  const [buttonTitle, setButtonTitle] = useState('View Reviews');
  const [reviewData, setReviewData] = useState([]);
  const details = useSelector(state => state.details);
  const restaurants = useSelector(state => state.restaurants);

  const updateReviewData = useCallback(() => {
    let temp = [];
    let nextNumber = 0;
    if (details.details[index].reviews) {
      const currentData = details.details[index].reviews;
      for (var i = 0; i < currentData.length; i++) {
        temp.push({
          author_name: currentData[i].author_name,
          rating: currentData[i].rating,
          relative_time_description: currentData[i].relative_time_description,
          text: currentData[i].text,
          next: nextNumber,
        });
        nextNumber++;
      }
      setReviewData(temp);
    }
  }, [details.details, index, setReviewData]);

  const checkViewState = useCallback(() => {
    if (viewReviews) {
      setButtonTitle('Hide Reviews');
    } else {
      setButtonTitle('View Reviews');
    }
  }, [viewReviews]);

  const allRatings = useCallback(() => {
    let temp = [];
    if (details.details[index].reviews) {
      const currentData = details.details[index].reviews;
      for (var i = 0; i < currentData.length; i++) {
        temp.push(currentData[i].rating);
      }
      setAllCustomerRatings(temp);
    }
  }, [details.details, index, setAllCustomerRatings]);

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
  }, [createStars, allRatings, details.details, viewReviews]);

  useEffect(() => {
    checkViewState();
    allRatings();
  }, [allRatings, checkViewState, viewReviews, details.details]);

  useEffect(() => {
    updateReviewData();
  }, [updateReviewData, details.details]);

  return (
    <View style={styles.container}>
      {details.details[index].reviews ? (
        <TouchableOpacity onPress={handleViewReviews}>
          <Text style={[styles.reviews, styles.reviewsTouchable]}>
            {buttonTitle}
          </Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.reviews}>No Reviews</Text>
      )}
      {customerRating ? (
        <ReviewScreen
          customerRating={customerRating}
          allRatings={allRatings}
          num={num}
          viewReviews={viewReviews}
          index={index}
          reviewData={reviewData}
          scrollReviewsToTop={scrollReviewsToTop}
          setScrollReviewsToTop={setScrollReviewsToTop}
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
  reviews: {
    fontSize: 22,
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
  reviewsTouchable: {
    color: 'blue',
  },
});

export default Reviews;
