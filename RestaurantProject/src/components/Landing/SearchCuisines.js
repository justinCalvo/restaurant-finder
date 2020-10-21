import React, { useState, useCallback, useEffect } from 'react';
import { View, TextInput, StyleSheet, Keyboard } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { updateQuery } from '../../redux/actions/queryActions';
import { useTheme } from '@react-navigation/native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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

  const theme = useTheme();

  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      width: wp('67%'),
    },
    input: {
      fontSize: hp('2%'),
      borderBottomWidth: wp('0.25%'),
      borderColor: colors.text,
      paddingVertical: hp('1.1%'),
      textAlign: 'center',
      color: colors.text,
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardAppearance={theme.dark ? 'dark' : 'light'}
        placeholderTextColor={colors.text}
        placeholder="Search..."
        returnKeyType="done"
        value={search}
        onChangeText={setSearch}
        onSubmitEditing={handleOnPressSubmit}
      />
    </View>
  );
};

export default SearchCuisines;
