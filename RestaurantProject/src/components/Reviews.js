import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';

const Reviews = ({ placeDetails, index, viewReviews, setViewReviews }) => {
  const [buttonTitle, setButtonTitle] = useState('View Reviews');

  const handleViewReviews = () => {
    if (buttonTitle === 'View Reviews') {
      setViewReviews(true);
      setButtonTitle('Hide Reviews');
    } else {
      setViewReviews(false);
      setButtonTitle('View Reviews');
    }
  };

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
            <Text style={styles.text}>{item.author_name}</Text>
            <Text style={styles.text}>Customer Rating: {item.rating}</Text>
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
});

export default Reviews;
