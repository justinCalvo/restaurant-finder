import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Stars from '../../utils/Stars';
import { useTheme } from '@react-navigation/native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CreateReviews = ({ item, onPress, style, selectedId }) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    text: {
      fontSize: hp('2%'),
      color: colors.text,
    },
    textContainer: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    showButton: {
      display: 'flex',
    },
    hideButton: {
      display: 'none',
    },
    readMore: {
      color: '#cb3737',
      fontSize: hp('1.6%'),
      fontWeight: 'bold',
    },
  });
  return (
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
};

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
              <Stars
                stars={customerRating}
                next={item.next}
                size={hp('2.8%')}
              />
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

  const { colors } = useTheme();

  const styles = StyleSheet.create({
    reviewDisplay: {
      display: 'flex',
      paddingHorizontal: hp('1.1%'),
    },
    reviewHide: {
      display: 'none',
    },
    noReviews: {
      fontSize: hp('2%'),
      fontWeight: 'bold',
      textAlign: 'center',
    },
    text: {
      fontSize: hp('2%'),
      color: colors.text,
    },
    timeText: {
      paddingHorizontal: hp('1.1%'),
    },
    ratingContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: hp('0.6%'),
    },
    authorText: {
      fontWeight: 'bold',
    },
    underlineContainer: {
      alignItems: 'center',
    },
    underline: {
      width: wp('67%'),
      height: wp('0.25%'),
      backgroundColor: colors.text,
      margin: hp('1.7%'),
    },
    displayFullReview: {
      flex: 1,
      flexDirection: 'row',
    },
  });

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

export default ReviewScreen;
