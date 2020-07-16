import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';

const Reviews = ({ placeDetails, index, viewReviews, setViewReviews }) => {
  const handleViewReviews = () => {
    setViewReviews(true);
  };

  return (
    <View>
      {placeDetails[index].reviews ? (
        <Button title="View Reviews" onPress={handleViewReviews} />
      ) : (
        <Text>No Reviews</Text>
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
});

export default Reviews;
