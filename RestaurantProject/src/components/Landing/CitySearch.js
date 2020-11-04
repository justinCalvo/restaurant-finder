import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { Routes } from '../../constants/NavConst';
import { useSelector, useDispatch } from 'react-redux';
import { getLocation } from '../../redux/actions/locationActions';

import { Sizes } from '../../constants/ResponsiveSizes';

const CitySearch = ({ isLoading, setIsLoading, min, max, meters, type }) => {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const query = useSelector(s => s.query);

  let stateInputRef = React.createRef();

  const getCity = async () => {
    if ((city && state) || zipcode) {
      setIsLoading(true);
      await dispatch(
        getLocation(
          city,
          state,
          zipcode,
          min,
          max,
          meters,
          type,
          query.cuisineQuery,
        ),
      );
      navigation.navigate(Routes.ShareToken);
      setIsLoading(false);
    } else {
      Alert.alert('Please enter city and state or zip code');
    }
  };

  const handleOnPressSubmit = () => {
    getCity();
    Keyboard.dismiss();
  };

  const theme = useTheme();

  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: Sizes.hp50,
    },
    textInput: {
      fontSize: Sizes.hp18,
      borderBottomWidth: Sizes.wp1,
      borderColor: colors.text,
      paddingVertical: Sizes.hp10,
      textAlign: 'center',
      color: colors.text,
    },
    text: {
      fontSize: Sizes.hp14,
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.text,
    },
    buttonText: {
      fontSize: Sizes.hp18,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#cb3737',
    },
    textContainer: {
      paddingTop: Sizes.hp10,
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        keyboardAppearance={theme.dark ? 'dark' : 'light'}
        placeholderTextColor={colors.text}
        onChangeText={setCity}
        value={city}
        placeholder="city"
        returnKeyType="next"
        autoCorrect={false}
        onSubmitEditing={() => {
          stateInputRef.focus();
        }}
        blurOnSubmit={false}
      />
      <TextInput
        style={styles.textInput}
        keyboardAppearance={theme.dark ? 'dark' : 'light'}
        placeholderTextColor={colors.text}
        onChangeText={setState}
        value={state}
        placeholder="state"
        ref={ref => (stateInputRef = ref)}
        returnKeyType="search"
        autoCorrect={false}
        onSubmitEditing={handleOnPressSubmit}
        blurOnSubmit={false}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>OR</Text>
      </View>
      <TextInput
        style={styles.textInput}
        keyboardAppearance={theme.dark ? 'dark' : 'light'}
        placeholderTextColor={colors.text}
        onChangeText={setZipcode}
        value={zipcode}
        placeholder="zipcode"
        returnKeyType="search"
        autoCorrect={false}
        onSubmitEditing={handleOnPressSubmit}
        blurOnSubmit={false}
      />
      <TouchableOpacity onPress={getCity}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CitySearch;
