import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Stars from '../../utils/Stars';

const CreateReviews = ({ item, onPress, style, selectedId }) => (
  <>
    {item.next === selectedId || item.text.length <= 100 ? (
      <Text style={styles.text}>{item.text}</Text>
    ) : (
      <View style={styles.textContainer}>
        <TouchableWithoutFeedback
          style={
            item.next === selectedId ? styles.hideButton : styles.showButton
          }
          onPress={onPress}>
          <Text style={styles.text}>
            {item.text.substr(0, 100)}
            <Text style={styles.readMore}> ... Read More</Text>
          </Text>
        </TouchableWithoutFeedback>
      </View>
    )}
  </>
);

const ReviewScreen = ({
  viewReviews,
  allRatings,
  customerRating,
  num,
  index,
  reviewData,
  scrollReviewsToTop,
  setScrollReviewsToTop,
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
              <Stars stars={customerRating} next={item.next} size={25} />
            </View>
          ) : null}
        </View>
        <View>
          <CreateReviews
            item={item}
            onPress={() => handleReadMore(item.next)}
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

  const handleScrollReviewsToTop = useCallback(() => {
    if (scrollReviewsToTop) {
      this.flatListRef.scrollToIndex({ animated: false, index: 0 });
      setSelectedId(null);
      setScrollReviewsToTop(false);
    }
  }, [scrollReviewsToTop, setScrollReviewsToTop]);

  const handleReadMore = next => {
    setSelectedId(next);
    this.flatListRef.scrollToIndex({ index: next });
  };

  useEffect(() => {
    handleScrollReviewsToTop();
  }, [handleScrollReviewsToTop, scrollReviewsToTop]);

  return (
    <View style={styles.container}>
      <FlatList
        style={viewReviews ? styles.reviewDisplay : styles.reviewHide}
        data={reviewData}
        ref={ref => {
          this.flatListRef = ref;
        }}
        keyExtractor={item => item.next.toString()}
        extraData={selectedId}
        renderItem={renderItem}
      />
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  // container: {
  //   alignItems: 'center',
  // },
  reviewDisplay: {
    display: 'flex',
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
    backgroundColor: '#1C2938',
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
    color: '#cb3737',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReviewScreen;
