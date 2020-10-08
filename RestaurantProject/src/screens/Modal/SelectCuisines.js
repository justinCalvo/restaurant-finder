import React, { useState, useCallback, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  FlatList,
  Platform,
} from 'react-native';
import SelectedCuisines from '../../components/Landing/SelectedCuisines';
import SearchCuisines from '../../components/Landing/SearchCuisines';
import CheckBox from '@react-native-community/checkbox';

import { useSelector, useDispatch } from 'react-redux';
import { updateCounter } from '../../redux/actions/counterActions';
import { updateQuery } from '../../redux/actions/queryActions';

import { CommonActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const SelectCuisines = ({ route }) => {
  const [limit, setLimit] = useState(false);
  const { cuisines, setCuisines } = route.params;

  const counter = useSelector(state => state.counter);
  const query = useSelector(state => state.query);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleToggle = useCallback(
    selected => {
      let temp = cuisines,
        updatedQuery = 'query=',
        list = [],
        i;

      for (i = 0; i < temp.length; i++) {
        if (temp[i].cuisine === selected) {
          if (!temp[i].selected && counter.counter > 0) {
            temp[i].selected = true;
            dispatch(updateCounter(counter.counter - 1));
          } else if (temp[i].selected && counter.counter < 4) {
            temp[i].selected = false;
            dispatch(updateCounter(counter.counter + 1));
          }
        }
        if (temp[i].selected) {
          updatedQuery += `${temp[i].cuisine}+Food+`;
          list.push({ cuisine: temp[i].cuisine, id: list.length });
        }
      }
      if (updatedQuery.length > 6) {
        updatedQuery = updatedQuery.substring(0, updatedQuery.length - 1);
      }

      updatedQuery += '&';
      console.log(updatedQuery);
      if (updatedQuery.length === 7) {
        dispatch(updateQuery('', [], cuisines));
      } else {
        dispatch(updateQuery(updatedQuery, list, cuisines));
      }
      setCuisines(temp);
    },
    [cuisines, setCuisines, counter.counter, dispatch],
  );

  const renderItem = ({ item }) => {
    return (
      <View style={styles.cuisines}>
        <Text style={styles.text}>{item.cuisine}</Text>
        {Platform.OS === 'ios' ? (
          <CheckBox
            tintColor="#1C2938"
            onTintColor="#ee6f57"
            onCheckColor="#ee6f57"
            value={item.selected}
            onValueChange={() => handleToggle(item.cuisine)}
            disabled={item.selected ? false : limit}
          />
        ) : (
          <CheckBox
            tintColors={{ true: '#ee6f57', false: '#1C2938' }}
            value={item.selected}
            onValueChange={() => handleToggle(item.cuisine)}
            disabled={item.selected ? false : limit}
          />
        )}
      </View>
    );
  };

  const handleCheckBoxes = useCallback(() => {
    if (counter.counter === 0) {
      setLimit(true);
    } else {
      setLimit(false);
    }
  }, [counter.counter]);

  useEffect(() => {
    handleCheckBoxes();
  }, [handleCheckBoxes, limit]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => navigation.dispatch(CommonActions.goBack())}>
        <View style={styles.modalClose} />
      </TouchableWithoutFeedback>
      <View style={styles.checkBoxContainer}>
        <SearchCuisines cuisines={cuisines} />
        <View style={styles.counterContainer}>
          <Text style={styles.text}>
            You may select up to{' '}
            <Text style={[styles.text, styles.counterText]}>
              {counter.counter}
            </Text>{' '}
            more
          </Text>
          <SelectedCuisines handleToggle={handleToggle} />
        </View>
        <View style={styles.checkBox}>
          <FlatList
            contentContainerStyle={styles.cuisineListContainer}
            data={query.displayCuisines}
            ref={ref => {
              this.flatListRef = ref;
            }}
            keyExtractor={(item, index) => index}
            renderItem={renderItem}
            numColumns={3}
          />
        </View>
      </View>
      <TouchableWithoutFeedback
        onPress={() => navigation.dispatch(CommonActions.goBack())}>
        <View style={styles.modalClose} />
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalClose: {
    height: height * 0.15,
    width: width,
  },
  text: {
    color: '#1C2938',
    fontSize: 16,
  },
  counterText: {
    fontWeight: 'bold',
    color: '#ee6f57',
  },
  checkBoxContainer: {
    backgroundColor: '#fafafa',
    alignItems: 'center',
    height: height * 0.6,
    width: width - 20,
    paddingBottom: width / 3,
  },
  checkBox: {
    flexDirection: 'row',
  },
  cuisines: {
    alignItems: 'center',
    width: width / 3.5,
    paddingBottom: 10,
  },
  cuisineListContainer: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  counterContainer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
});

export default SelectCuisines;
