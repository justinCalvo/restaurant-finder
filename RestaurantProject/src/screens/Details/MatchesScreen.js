import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const MatchesScreen = ({ navigation, stars }) => {
  const displayMatches = useSelector(state => state.matches);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.matchContainer}>
        <Image
          style={[styles.condensed, styles.image]}
          source={{ uri: item.photos[1].url }}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.text}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Icon name={stars[item.nextStars][0]} size={20} color="gold" />
            <Icon name={stars[item.nextStars][1]} size={20} color="gold" />
            <Icon name={stars[item.nextStars][2]} size={20} color="gold" />
            <Icon name={stars[item.nextStars][3]} size={20} color="gold" />
            <Icon name={stars[item.nextStars][4]} size={20} color="gold" />
          </View>
          <View style={styles.priceContainer}>
            <FontAwesome
              name="dollar"
              size={18}
              color="black"
              style={
                item.price_level >= 1
                  ? styles.showDollarOne
                  : styles.hideDollarOne
              }
            />
            <FontAwesome
              name="dollar"
              size={18}
              color="black"
              style={
                item.price_level >= 2
                  ? styles.showDollarTwo
                  : styles.hideDollarTwo
              }
            />
            <FontAwesome
              name="dollar"
              size={18}
              color="black"
              style={
                item.price_level >= 3
                  ? styles.showDollarThree
                  : styles.hideDollarThree
              }
            />
            <FontAwesome
              name="dollar"
              size={18}
              color="black"
              style={
                item.price_level >= 4
                  ? styles.showDollarFour
                  : styles.hideDollarFour
              }
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={displayMatches.displayMatches}
        keyExtractor={item => item.nextStars.toString()}
        extraData={stars}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    paddingVertical: 30,
    paddingHorizontal: 40,
  },
  condensed: {
    width: width / 5,
    height: width / 5,
  },
  matchContainer: {
    width: width,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  image: {
    borderRadius: 40,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  detailsContainer: {
    alignItems: 'flex-end',
  },
  priceContainer: {
    flexDirection: 'row',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  showDollarOne: {
    display: 'flex',
  },
  hideDollarOne: {
    display: 'none',
  },
  showDollarTwo: {
    display: 'flex',
  },
  hideDollarTwo: {
    display: 'none',
  },
  showDollarThree: {
    display: 'flex',
  },
  hideDollarThree: {
    display: 'none',
  },
  showDollarFour: {
    display: 'flex',
  },
  hideDollarFour: {
    display: 'none',
  },
});

export default MatchesScreen;
