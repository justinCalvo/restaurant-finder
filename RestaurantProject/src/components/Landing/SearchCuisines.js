import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Keyboard,
  Dimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { updateQuery } from '../../redux/actions/queryActions';

const SearchCuisines = ({ cuisines }) => {
  const [search, setSearch] = useState('');

  const query = useSelector(state => state.query);

  const dispatch = useDispatch();

  const handleOnPressSubmit = () => {
    Keyboard.dismiss();
  };

  const checkSearch = useCallback(() => {
    if (search.length > 0) {
      let i,
        temp = [];
      for (i = 0; i < cuisines.length; i++) {
        if (cuisines[i].cuisine.includes(search)) {
          temp.push(cuisines[i]);
        }
      }
      if (temp.length > 0) {
        dispatch(updateQuery(query.cuisineQuery, query.cuisineList, temp));
      } else {
        dispatch(updateQuery(query.cuisineQuery, query.cuisineList, cuisines));
      }
    } else {
      dispatch(updateQuery(query.cuisineQuery, query.cuisineList, cuisines));
    }
  }, [cuisines, dispatch, query.cuisineList, query.cuisineQuery, search]);

  useEffect(() => {
    checkSearch();
  }, [checkSearch, search]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        returnKeyType="done"
        value={search}
        onChangeText={setSearch}
        onSubmitEditing={handleOnPressSubmit}
      />
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width / 1.5,
  },
  input: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: '#1C2938',
    paddingVertical: 10,
    textAlign: 'center',
    color: '#1C2938',
  },
});

export default SearchCuisines;
