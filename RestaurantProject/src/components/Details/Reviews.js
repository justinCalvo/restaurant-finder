import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import ReviewScreen from '../../screens/Details/ReviewScreen';

const Reviews = ({
  restaurants,
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

  const updateReviewData = useCallback(() => {
    let temp = [];
    let nextNumber = 0;
    if (restaurants[index].reviews) {
      const currentData = restaurants[index].reviews;
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
  }, [restaurants, index, setReviewData]);

  const checkViewState = useCallback(() => {
    if (viewReviews) {
      setButtonTitle('Hide Reviews');
    } else {
      setButtonTitle('View Reviews');
    }
  }, [viewReviews]);

  const allRatings = useCallback(() => {
    let temp = [];
    if (restaurants[index].reviews) {
      const currentData = restaurants[index].reviews;
      for (var i = 0; i < currentData.length; i++) {
        temp.push(currentData[i].rating);
      }
      setAllCustomerRatings(temp);
    }
  }, [restaurants, index, setAllCustomerRatings]);

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
  }, [createStars, allRatings, restaurants, viewReviews]);

  useEffect(() => {
    checkViewState();
    allRatings();
  }, [allRatings, checkViewState, viewReviews, restaurants]);

  useEffect(() => {
    updateReviewData();
  }, [updateReviewData, restaurants]);

  return (
    <View style={styles.container}>
      {restaurants[index].reviews ? (
        <Button title={buttonTitle} onPress={handleViewReviews} />
      ) : (
        <Text style={styles.noReviews}>No Reviews</Text>
      )}
      {customerRating ? (
        <ReviewScreen
          customerRating={customerRating}
          restaurants={restaurants}
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
