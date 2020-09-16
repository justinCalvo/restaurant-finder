import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Keyboard,
  Alert,
  Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../constants/NavConst';
import { useDispatch } from 'react-redux';
import { getLocation } from '../../redux/actions/locationActions';

const CitySearch = ({
  isLoading,
  setIsLoading,
  min,
  max,
  meters,
  type,
  cuisines,
}) => {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation();

  let stateInputRef = React.createRef();

  const getCity = async () => {
    if ((city && state) || zipcode) {
      setIsLoading(true);
      await dispatch(
        getLocation(city, state, zipcode, min, max, meters, type, cuisines),
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

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
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
        onChangeText={setZipcode}
        value={zipcode}
        placeholder="zipcode"
        returnKeyType="search"
        autoCorrect={false}
        onSubmitEditing={handleOnPressSubmit}
        blurOnSubmit={false}
      />
      <Button onPress={getCity} title="Search" />
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width,
    paddingHorizontal: 50,
  },
  textInput: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: '#1C2938',
    paddingVertical: 10,
    textAlign: 'center',
    color: '#1C2938',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1C2938',
  },
  textContainer: {
    paddingTop: 10,
  },
});

export default CitySearch;
