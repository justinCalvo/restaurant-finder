import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Reviews = ({
  viewReviews,
  restaurants,
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
            <Text style={[styles.text, styles.authorText]}>
              {item.author_name}
            </Text>
            <View style={styles.ratingContainer}>
              <Text style={[styles.text, styles.timeText]}>
                {item.relative_time_description}
              </Text>
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
            </View>
            <View>
              <View>
                <Text style={styles.text}>{item.text}</Text>
              </View>
            </View>
            {item.next !== 4 ? (
              <View style={styles.underlineContainer}>
                <View style={styles.underline} />
              </View>
            ) : null}
          </View>
        )}
      />
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  reviewDisplay: {
    display: 'flex',
    marginBottom: 120,
    paddingHorizontal: 10,
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
  timeText: {
    paddingHorizontal: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  authorText: {
    fontWeight: 'bold',
  },
  underlineContainer: {
    width: width,
    alignItems: 'center',
  },
  underline: {
    width: width / 1.5,
    height: 1,
    backgroundColor: 'black',
    margin: 15,
  },
  displayFullReview: {
    flex: 1,
    flexDirection: 'row',
  },
  more: {
    color: 'blue',
    fontSize: 16,
  },
});

export default Reviews;
