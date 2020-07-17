import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';

const Reviews = ({ placeDetails, index, viewReviews, setViewReviews }) => {
  const [buttonTitle, setButtonTitle] = useState('');

  const handleViewReviews = () => {
    if (buttonTitle === 'View Reviews') {
      setViewReviews(true);
    } else {
      setViewReviews(false);
    }
  };

  const changeButtonTitle = useCallback(() => {
    if (viewReviews) {
      setButtonTitle('Hide Reviews');
    } else {
      setButtonTitle('View Reviews');
    }
  }, [viewReviews]);

  useEffect(() => {
    changeButtonTitle();
  }, [viewReviews, changeButtonTitle]);

  return (
    <View>
      {placeDetails[index].reviews ? (
        <Button title={buttonTitle} onPress={handleViewReviews} />
      ) : (
        <Text style={styles.noReviews}>No Reviews</Text>
      )}
      <FlatList
        style={viewReviews ? styles.reviewDisplay : styles.reviewHide}
        data={placeDetails[index].reviews}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.author_name}</Text>
            <Text>Customer Rating: {item.rating}</Text>
            <Text>{item.relative_time_description}</Text>
            <Text>{item.text}</Text>
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
});

export default Reviews;
