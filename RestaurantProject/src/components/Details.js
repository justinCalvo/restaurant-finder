import React from 'react';
import { View, Text, StyleSheet, Linking, Dimensions } from 'react-native';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import Reviews from './Reviews';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Details = ({
  restaurants,
  placeDetails,
  setPlaceDetails,
  index,
  showDetails,
  setShowDetails,
  viewReviews,
  setViewReviews,
  customerRating,
  setCustomerRating,
  allCustomerRatings,
  setAllCustomerRatings,
  num,
  setNum,
}) => {
  return (
    <FlingGestureHandler
      direction={Directions.UP}
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
          setShowDetails(true);
        }
      }}>
      <FlingGestureHandler
        direction={Directions.DOWN}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.ACTIVE) {
            setShowDetails(false);
          }
        }}>
        <View style={styles.container}>
          <View style={styles.bottomDragContainer}>
            {showDetails ? (
              <Text style={styles.description}>Hide Details</Text>
            ) : (
              <Text style={styles.description}>View Details</Text>
            )}
          </View>
          <View style={[showDetails ? styles.display : styles.hide]}>
            <View style={styles.contactContainer}>
              {placeDetails[index].formatted_phone_number ? (
                <Text
                  style={styles.text}
                  onPress={() =>
                    Linking.openURL(
                      `tel:${placeDetails[index].formatted_phone_number}`,
                    )
                  }>
                  <Icon name="phone" size={15} />
                  {placeDetails[index].formatted_phone_number}
                </Text>
              ) : null}
              <Text
                onPress={() => Linking.openURL(placeDetails[index].website)}
                style={[styles.website, styles.text]}>
                {restaurants[index].name}
              </Text>
            </View>
            {!viewReviews ? (
              <Text style={[styles.scheduleText, styles.text]}>
                {placeDetails[index].opening_hours.weekday_text[0]}
                {'\n'}
                {placeDetails[index].opening_hours.weekday_text[1]}
                {'\n'}
                {placeDetails[index].opening_hours.weekday_text[2]}
                {'\n'}
                {placeDetails[index].opening_hours.weekday_text[3]}
                {'\n'}
                {placeDetails[index].opening_hours.weekday_text[4]}
                {'\n'}
                {placeDetails[index].opening_hours.weekday_text[5]}
                {'\n'}
                {placeDetails[index].opening_hours.weekday_text[6]}
              </Text>
            ) : null}
            <Reviews
              placeDetails={placeDetails}
              index={index}
              viewReviews={viewReviews}
              setViewReviews={setViewReviews}
              customerRating={customerRating}
              setCustomerRating={setCustomerRating}
              allCustomerRatings={allCustomerRatings}
              setAllCustomerRatings={setAllCustomerRatings}
              num={num}
              setNum={setNum}
            />
          </View>
        </View>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width,
    alignItems: 'center',
  },
  display: {
    display: 'flex',
    width: width,
    height: height - height / 2,
  },
  hide: {
    display: 'none',
  },
  description: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  text: {
    fontSize: 18,
  },
  website: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    flexWrap: 'wrap',
  },
  scheduleText: {
    textAlign: 'center',
  },
  bottomDragContainer: {
    width: width / 1.5,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: 'black',
  },
});

export default Details;
