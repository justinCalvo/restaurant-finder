import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Reviews = ({
  viewReviews,
  placeDetails,
  allRatings,
  customerRating,
  num,
  index,
  reviewData,
}) => {
  return (
    <View>
      <FlatList
        style={viewReviews ? styles.reviewDisplay : styles.reviewHide}
        data={reviewData}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.text}>{item.author_name}</Text>
            {customerRating.length > 0 && customerRating[item.next] ? (
              <View style={styles.ratingContainer}>
                <Icon
                  name={customerRating[item.next][0]}
                  size={25}
                  color="gold"
                />
                <Icon
                  name={customerRating[item.next][1]}
                  size={25}
                  color="gold"
                />
                <Icon
                  name={customerRating[item.next][2]}
                  size={25}
                  color="gold"
                />
                <Icon
                  name={customerRating[item.next][3]}
                  size={25}
                  color="gold"
                />
                <Icon
                  name={customerRating[item.next][4]}
                  size={25}
                  color="gold"
                />
              </View>
            ) : null}
            <Text style={styles.text}>{item.relative_time_description}</Text>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        )}
      />
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
