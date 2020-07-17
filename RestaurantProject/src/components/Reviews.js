import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Reviews = ({
  placeDetails,
  index,
  viewReviews,
  setViewReviews,
  restaurants,
}) => {
  const [buttonTitle, setButtonTitle] = useState('View Reviews');
  // const [customerRating, setCustomerRating] = useState([]);
  // const [allCustomerRatings, setAllCustomerRatings] = useState([]);
  // const [num, setNum] = useState(0);

  const handleViewReviews = useCallback(() => {
    if (!viewReviews) {
      setViewReviews(true);
      // allRatings();
    } else {
      setViewReviews(false);
    }
  }, [setViewReviews, viewReviews]);

  const checkViewState = useCallback(() => {
    if (viewReviews) {
      setButtonTitle('Hide Reviews');
    } else {
      setButtonTitle('View Reviews');
    }
  }, [viewReviews]);

  useEffect(() => {
    checkViewState();
  }, [checkViewState, viewReviews]);

  // const allRatings = useCallback(() => {
  //   let temp = [];
  //   if (placeDetails[index].reviews) {
  //     placeDetails[index].reviews.forEach(item => {
  //       temp.push(item.rating);
  //     });
  //     setAllCustomerRatings(temp);
  //   }
  // }, [placeDetails, index]);
  // console.log(allCustomerRatings);

  // const createStars = useCallback(() => {
  //   const wholeNumber = allCustomerRatings[num]
  //     ? allCustomerRatings[num]
  //     : null;
  //   let customerRatingArray = [];
  //   if (wholeNumber) {
  //     for (var i = 1; i <= 5; i++) {
  //       if (i <= wholeNumber) {
  //         customerRatingArray.push('star');
  //       } else {
  //         customerRatingArray.push('star-border');
  //       }
  //     }
  //     setCustomerRating(oldArray => [...oldArray, customerRatingArray]);
  //     setNum(num + 1);
  //   }
  // }, [allCustomerRatings, num]);

  // console.log(customerRating);

  // useEffect(() => {
  //   createStars();
  // }, [createStars, allRatings, placeDetails, viewReviews]);

  return (
    <View>
      {placeDetails[index].reviews ? (
        <Button title={buttonTitle} onPress={handleViewReviews} />
      ) : (
        <Text style={styles.noReviews}>No Reviews</Text>
      )}
      {/* {customerRating.length > 0 ? ( */}
      <FlatList
        style={viewReviews ? styles.reviewDisplay : styles.reviewHide}
        data={placeDetails[index].reviews}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.text}>{item.author_name}</Text>
            <Text style={styles.text}>Customer Rating: {item.rating}</Text>
            {/* <View style={styles.ratingContainer}>
              <Icon name={customerRating[num][0]} size={25} color="gold" />
              <Icon name={customerRating[num][1]} size={25} color="gold" />
              <Icon name={customerRating[num][2]} size={25} color="gold" />
              <Icon name={customerRating[num][3]} size={25} color="gold" />
              <Icon name={customerRating[num][4]} size={25} color="gold" />
            </View> */}
            <Text style={styles.text}>{item.relative_time_description}</Text>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        )}
      />
      {/* ) : null} */}
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
