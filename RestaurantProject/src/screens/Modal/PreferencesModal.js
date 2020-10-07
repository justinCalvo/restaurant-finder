import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  FlatList,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateType } from '../../redux/actions/typeActions';
import { updateQuery } from '../../redux/actions/queryActions';
import { updateNotified } from '../../redux/actions/notificationActions';

import { CommonActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

import PriceRating from '../../utils/PriceRating';
import Selector from '../../utils/Selector';
import CaretButton from '../../utils/CaretButton';

import Icon from 'react-native-vector-icons/Ionicons';

const PreferencesModal = ({ route }) => {
  const {
    min,
    setMin,
    max,
    setMax,
    setMeters,
    miles,
    setMiles,
    type,
    setType,
    cuisines,
    setCuisines,
    setIsModalOpen,
  } = route.params;

  const [togglePriceRange, setTogglePriceRange] = useState(true);
  const [toggleRadius, setToggleRadius] = useState(false);
  const [toggleTypes, setToggleTypes] = useState(false);

  const [mileValue, setMileValue] = useState(miles);
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  const [typeValue, setTypeValue] = useState(type);

  const types = useSelector(state => state.types);
  const query = useSelector(state => state.query);
  const notified = useSelector(state => state.notified);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSetRadius = () => {
    setToggleRadius(!toggleRadius);
    setTogglePriceRange(false);
    setToggleTypes(false);
  };

  const handleSetPriceRange = () => {
    setTogglePriceRange(!togglePriceRange);
    setToggleRadius(false);
    setToggleTypes(false);
  };

  const handleSetType = () => {
    setToggleTypes(!toggleTypes);
    setToggleRadius(false);
    setTogglePriceRange(false);
  };

  useEffect(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  const convertMilesToMeters = useCallback(() => {
    const newMeters = mileValue.slice(0, 2) * 1609.34;
    setMeters(newMeters);
  }, [mileValue, setMeters]);

  const handleMinMaxOverflow = useCallback(() => {
    if (maxValue < minValue) {
      setMaxValue(minValue);
    }
    if (minValue > maxValue) {
      setMinValue(maxValue);
    }
  }, [maxValue, minValue]);

  useEffect(() => {
    handleMinMaxOverflow();
  }, [maxValue, minValue, handleMinMaxOverflow]);

  useEffect(() => {
    convertMilesToMeters();
  }, [convertMilesToMeters, mileValue]);

  const updateTypeName = useCallback(() => {
    if (typeValue === 'restaurant') {
      dispatch(updateType('Restaurants'));
    } else if (typeValue === 'cafe') {
      dispatch(updateType('Cafes'));
    } else {
      dispatch(updateType('Bars'));
    }
  }, [dispatch, typeValue]);

  useEffect(() => {
    updateTypeName();
  }, [updateTypeName, typeValue]);

  const updateMinMax = useCallback(() => {
    setMin(minValue);
    setMax(maxValue);
  }, [maxValue, minValue, setMax, setMin]);

  useEffect(() => {
    updateMinMax();
  }, [updateMinMax, maxValue, minValue, setMax, setMin]);

  const updateTypeValue = useCallback(() => {
    setType(typeValue);
  }, [setType, typeValue]);

  useEffect(() => {
    updateTypeValue();
  }, [updateTypeValue, setType, typeValue]);

  const updateMileValue = useCallback(() => {
    setMiles(mileValue);
  }, [setMiles, mileValue]);

  useEffect(() => {
    updateMileValue();
  }, [updateMileValue, mileValue, setMiles]);

  const acknowledgment = () => {
    navigation.navigate('SelectCuisines', {
      cuisines: cuisines,
      setCuisines: setCuisines,
    });
    dispatch(updateNotified(true));
  };

  const navigateSelectCuisines = () => {
    dispatch(updateQuery(query.cuisineQuery, query.cuisineList, cuisines));
    if (!notified.notified) {
      Alert.alert(
        'Heads Up!',
        'Customizing cuisines can/will bypass the radius preference. Continue?',
        [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'YES',
            onPress: () => acknowledgment(),
          },
        ],
      );
    } else {
      navigation.navigate('SelectCuisines', {
        cuisines: cuisines,
        setCuisines: setCuisines,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => navigation.dispatch(CommonActions.goBack())}>
        <View style={styles.modalClose} />
      </TouchableWithoutFeedback>
      <View style={styles.preferencesContainer}>
        {typeValue === 'restaurant' ? (
          <View style={styles.selectedCuisines}>
            <TouchableOpacity onPress={() => navigateSelectCuisines()}>
              <Text style={styles.text}>
                Selected Cuisines{' '}
                <Icon name="create-sharp" size={20} color="#cb3737" />
              </Text>
            </TouchableOpacity>
            <View style={styles.cuisinesContainer}>
              {query.cuisineList.length > 0 ? (
                <View style={styles.cuisineNames}>
                  <FlatList
                    contentContainerStyle={styles.cuisineListContainer}
                    data={query.cuisineList}
                    keyExtractor={(item, index) => index}
                    numColumns={4}
                    renderItem={({ item }) => (
                      <View style={styles.selected}>
                        <Text style={styles.valueText}>{item.cuisine}</Text>
                        {item.id !== query.cuisineList.length - 1 ? (
                          <View style={styles.line}>
                            <Text style={styles.lineText}>|</Text>
                          </View>
                        ) : null}
                      </View>
                    )}
                  />
                </View>
              ) : (
                <Text style={styles.valueText}>All</Text>
              )}
            </View>
          </View>
        ) : (
          <View style={styles.cuisinesContainer} />
        )}
        <View style={styles.pickerContainer}>
          <Selector
            toggle={toggleTypes}
            value={typeValue}
            setValue={setTypeValue}
            title="Set Type"
            labels={['Restaurants', 'Cafes', 'Bars']}
            values={['restaurant', 'cafe', 'bar']}
          />
          <Selector
            toggle={toggleRadius}
            value={mileValue}
            setValue={setMileValue}
            title="Set Miles"
            labels={['5', '10', '15', '20', '25']}
            values={['5 Miles', '10 Miles', '15 Miles', '20 Miles', '25 Miles']}
          />
          <Selector
            toggle={togglePriceRange}
            value={minValue}
            setValue={setMinValue}
            title="Set Min"
            labels={['$', '$$', '$$$', '$$$$']}
            values={['1', '2', '3', '4']}
          />
          <Selector
            toggle={togglePriceRange}
            value={maxValue}
            setValue={setMaxValue}
            title="Set Max"
            labels={['$$$$', '$$$', '$$', '$']}
            values={['4', '3', '2', '1']}
          />
        </View>
        <CaretButton
          toggle={togglePriceRange}
          handleSetting={handleSetPriceRange}
          title="Price Range"
        />
        <View style={styles.priceContainer}>
          <View style={[styles.dollarSigns, styles.minMaxDollarSigns]}>
            <PriceRating priceLevel={minValue} size={16} />
          </View>
          <View style={[styles.dollarSigns, styles.minMaxDollarSigns]}>
            <PriceRating priceLevel={maxValue} size={16} />
          </View>
        </View>
        <View style={styles.minMaxContainer}>
          <CaretButton
            toggle={toggleTypes}
            handleSetting={handleSetType}
            title="Where to?"
          />
          <CaretButton
            toggle={toggleRadius}
            handleSetting={handleSetRadius}
            title="Radius"
          />
        </View>
        <View style={styles.priceContainer}>
          <View style={[styles.dollarSigns, styles.minMaxDollarSigns]}>
            <Text style={styles.valueText}>{types.typeName}</Text>
          </View>
          <View style={[styles.dollarSigns, styles.minMaxDollarSigns]}>
            <Text style={styles.valueText}>{mileValue}</Text>
          </View>
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
    height: height / 1.5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalClose: {
    height: height * 0.25,
    width: width,
  },
  preferencesContainer: {
    backgroundColor: '#fafafa',
    alignItems: 'center',
    height: height * 0.45,
    width: width - 20,
  },
  minMaxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width / 1.5,
  },
  priceContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    width: width / 1.5,
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#1C2938',
  },
  valueText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#1C2938',
  },
  dollarSigns: {
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  minMaxDollarSigns: {
    justifyContent: 'center',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
  },
  optionsContainer: {
    paddingVertical: 10,
  },
  cuisinesContainer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  selectedCuisines: {
    paddingTop: 10,
    alignItems: 'center',
  },
  cuisineListContainer: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  selected: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cuisineNames: {
    flexDirection: 'row',
  },
  line: {
    marginLeft: 15,
  },
  lineText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#cb3737',
  },
});

export default PreferencesModal;