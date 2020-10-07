import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';

import { useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons';

const SelectedCuisines = ({ handleToggle }) => {
  const query = useSelector(state => state.query);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.cuisines}>
        <TouchableOpacity onPress={() => handleToggle(item.cuisine)}>
          <View style={styles.deleteCuisine}>
            <Text style={styles.text}>{item.cuisine}</Text>
            <Icon name="close" size={18} color="#cb3737" />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.cuisineListContainer}
        data={query.cuisineList}
        ref={ref => {
          this.flatListRef = ref;
        }}
        keyExtractor={(item, index) => index}
        renderItem={renderItem}
        numColumns={2}
      />
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  cuisineListContainer: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  cuisines: {
    alignItems: 'center',
    width: width / 3,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1C2938',
  },
  deleteCuisine: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1C2938',
    borderRadius: 20,
    marginTop: 10,
    paddingHorizontal: 5,
  },
});

export default SelectedCuisines;
