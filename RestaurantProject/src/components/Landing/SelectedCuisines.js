import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

import { useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';

import { Sizes } from '../../constants/ResponsiveSizes';

const SelectedCuisines = ({ handleToggle }) => {
  const query = useSelector(state => state.query);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.cuisines}>
        <TouchableOpacity onPress={() => handleToggle(item.cuisine)}>
          <View style={styles.deleteCuisine}>
            <Text style={styles.text}>{item.cuisine}</Text>
            <Icon name="close" size={Sizes.hp18} color="#cb3737" />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
    cuisineListContainer: {
      alignItems: 'center',
      paddingBottom: Sizes.hp10,
    },
    cuisines: {
      alignItems: 'center',
      width: Sizes.wp1_3rd,
    },
    text: {
      fontSize: Sizes.hp14,
      fontWeight: 'bold',
      color: colors.text,
    },
    deleteCuisine: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: Sizes.wp1,
      borderColor: colors.text,
      borderRadius: Sizes.hp20,
      marginTop: Sizes.hp10,
      paddingHorizontal: Sizes.hp5,
    },
  });

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

export default SelectedCuisines;
