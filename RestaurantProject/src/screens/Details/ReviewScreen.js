import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CreateReviews = ({ item, onPress, style, selectedId }) => (
  <>
    {item.next === selectedId || item.next.length <= 80 ? (
      <Text style={styles.text}>{item.text}</Text>
    ) : (
      <View style={styles.textContainer}>
        <TouchableOpacity
          style={
            item.next === selectedId ? styles.hideButton : styles.showButton
          }
          onPress={onPress}>
          <Text style={styles.text}>
            {item.text.substr(0, 80)}
            <Text style={styles.readMore}> ...Read More</Text>
          </Text>
        </TouchableOpacity>
      </View>
    )}
  </>
);

const ReviewScreen = ({
  viewReviews,
  restaurants,
  allRatings,
  customerRating,
  num,
  index,
  reviewData,
}) => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const display = item.next === selectedId ? 'flex' : 'none';

    return (
      <View>
        <Text style={[styles.text, styles.authorText]}>{item.author_name}</Text>
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
          <CreateReviews
            item={item}
            onPress={() => setSelectedId(item.next)}
            selectedId={selectedId}
            style={{ display }}
          />
        </View>
        {item.next !== 4 ? (
          <View style={styles.underlineContainer}>
            <View style={styles.underline} />
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <View>
      <FlatList
        style={viewReviews ? styles.reviewDisplay : styles.reviewHide}
        data={reviewData}
        keyExtractor={item => item.next}
        extraData={selectedId}
        renderItem={renderItem}
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
  showButton: {
    display: 'flex',
  },
  hideButton: {
    display: 'none',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  readMore: {
    color: 'blue',
    fontSize: 16,
  },
});

export default ReviewScreen;
