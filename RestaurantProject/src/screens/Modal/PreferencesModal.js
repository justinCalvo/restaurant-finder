import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  FlatList,
  Alert,
  Platform,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateType } from '../../redux/actions/typeActions';
import { updateQuery } from '../../redux/actions/queryActions';
import { updateNotified } from '../../redux/actions/notificationActions';

import {
  CommonActions,
  useNavigation,
  useTheme,
} from '@react-navigation/native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { Sizes } from '../../constants/ResponsiveSizes';

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

  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    modalClose: {
      height: Sizes.hp1_4th,
      width: Sizes.wp_full,
    },
    preferencesContainer: {
      backgroundColor: colors.background,
      alignItems: 'center',
      height: hp('45%'),
      width: wp('94%'),
    },
    minMaxContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: Sizes.wp2_3rd,
    },
    priceContainer: {
      paddingVertical: Sizes.hp10,
      flexDirection: 'row',
      width: Sizes.wp2_3rd,
      alignItems: 'center',
    },
    text: {
      fontWeight: 'bold',
      fontSize: Sizes.hp18,
      color: colors.text,
    },
    valueText: {
      fontWeight: 'bold',
      fontSize: Sizes.hp14,
      color: colors.text,
    },
    dollarSigns: {
      flexDirection: 'row',
      flex: 1,
      paddingVertical: Sizes.hp5,
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
      paddingVertical: Sizes.hp10,
    },
    cuisinesContainer: {
      paddingVertical: Sizes.hp10,
      alignItems: 'center',
    },
    selectedCuisines: {
      paddingTop: Sizes.hp10,
      alignItems: 'center',
    },
    cuisineListContainer: {
      alignItems: 'center',
      paddingBottom: Sizes.hp10,
    },
    selected: {
      paddingHorizontal: Sizes.hp10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    cuisineNames: {
      flexDirection: 'row',
    },
    line: {
      marginLeft: Sizes.hp15,
    },
    lineText: {
      fontWeight: 'bold',
      fontSize: Sizes.hp14,
      color: '#cb3737',
    },
    close: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      height: Sizes.hp1_4th,
      width: wp('94%'),
    },
    androidRadius: {
      flex: 0.9,
      alignItems: 'center',
    },
    androidWhereTo: {
      flex: 0.5,
      alignItems: 'center',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => navigation.dispatch(CommonActions.goBack())}>
        <View style={styles.close}>
          <Icon name="close-circle-outline" size={Sizes.hp40} color="#fafafa" />
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.preferencesContainer}>
        {typeValue === 'restaurant' ? (
          <View style={styles.selectedCuisines}>
            <TouchableOpacity onPress={() => navigateSelectCuisines()}>
              <Text style={styles.text}>
                Selected Cuisines{' '}
                <Icon name="create-sharp" size={Sizes.hp20} color="#cb3737" />
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
          {Platform.OS === 'ios' ? (
            <>
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
                values={[
                  '5 Miles',
                  '10 Miles',
                  '15 Miles',
                  '20 Miles',
                  '25 Miles',
                ]}
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
            </>
          ) : null}
        </View>
        {Platform.OS === 'ios' ? (
          <CaretButton
            toggle={togglePriceRange}
            handleSetting={handleSetPriceRange}
            title="Price Range"
          />
        ) : (
          <Text style={styles.text}>Price Range</Text>
        )}
        <View style={styles.priceContainer}>
          <View style={[styles.dollarSigns, styles.minMaxDollarSigns]}>
            {Platform.OS === 'ios' ? (
              <PriceRating priceLevel={minValue} size={Sizes.hp14} />
            ) : (
              <Selector
                toggle={true}
                value={minValue}
                setValue={setMinValue}
                title="Set Min"
                labels={['$', '$$', '$$$', '$$$$']}
                values={['1', '2', '3', '4']}
              />
            )}
          </View>
          <View style={[styles.dollarSigns, styles.minMaxDollarSigns]}>
            {Platform.OS === 'ios' ? (
              <PriceRating priceLevel={maxValue} size={Sizes.hp14} />
            ) : (
              <Selector
                toggle={true}
                value={maxValue}
                setValue={setMaxValue}
                title="Set Max"
                labels={['$$$$', '$$$', '$$', '$']}
                values={['4', '3', '2', '1']}
              />
            )}
          </View>
        </View>
        <View style={styles.minMaxContainer}>
          {Platform.OS === 'ios' ? (
            <>
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
            </>
          ) : (
            <>
              <View style={styles.androidWhereTo}>
                <Text style={styles.text}>Where to?</Text>
              </View>
              <View style={styles.androidRadius}>
                <Text style={styles.text}>Radius</Text>
              </View>
            </>
          )}
        </View>
        <View style={styles.priceContainer}>
          <View style={[styles.dollarSigns, styles.minMaxDollarSigns]}>
            {Platform.OS === 'ios' ? (
              <Text style={styles.valueText}>{types.typeName}</Text>
            ) : (
              <Selector
                toggle={true}
                value={typeValue}
                setValue={setTypeValue}
                title="Set Type"
                labels={['Restaurants', 'Cafes', 'Bars']}
                values={['restaurant', 'cafe', 'bar']}
              />
            )}
          </View>
          <View style={[styles.dollarSigns, styles.minMaxDollarSigns]}>
            {Platform.OS === 'ios' ? (
              <Text style={styles.valueText}>{mileValue}</Text>
            ) : (
              <Selector
                toggle={true}
                value={mileValue}
                setValue={setMileValue}
                title="Set Miles"
                labels={[
                  '5 Miles',
                  '10 Miles',
                  '15 Miles',
                  '20 Miles',
                  '25 Miles',
                ]}
                values={[
                  '5 Miles',
                  '10 Miles',
                  '15 Miles',
                  '20 Miles',
                  '25 Miles',
                ]}
              />
            )}
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

export default PreferencesModal;
