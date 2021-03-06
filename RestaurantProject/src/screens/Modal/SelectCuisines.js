import React, { useState, useCallback, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  FlatList,
  Platform,
} from 'react-native';
import SelectedCuisines from '../../components/Landing/SelectedCuisines';
import SearchCuisines from '../../components/Landing/SearchCuisines';
import CheckBox from '@react-native-community/checkbox';

import { useSelector, useDispatch } from 'react-redux';
import { updateCounter } from '../../redux/actions/counterActions';
import { updateQuery } from '../../redux/actions/queryActions';

import {
  CommonActions,
  useNavigation,
  useTheme,
} from '@react-navigation/native';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { Sizes } from '../../constants/ResponsiveSizes';

import Icon from 'react-native-vector-icons/Ionicons';

const SelectCuisines = ({ route }) => {
  const [limit, setLimit] = useState(false);
  const { cuisines, setCuisines } = route.params;

  const counter = useSelector(state => state.counter);
  const query = useSelector(state => state.query);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const columns = Sizes.wp_full <= 350 ? 2 : 3;

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
          } else if (temp[i].selected && counter.counter < 3) {
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
            tintColor={colors.text}
            onTintColor="#ee6f57"
            onCheckColor="#ee6f57"
            value={item.selected}
            onValueChange={() => handleToggle(item.cuisine)}
            disabled={item.selected ? false : limit}
          />
        ) : (
          <CheckBox
            tintColors={{ true: '#ee6f57', false: colors.text }}
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

  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      height: Sizes.hp_full,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    modalClose: {
      height: Sizes.hp1_4th,
      width: Sizes.wp_full,
    },
    text: {
      color: colors.text,
      fontSize: Sizes.hp16,
    },
    counterText: {
      fontWeight: 'bold',
      color: '#ee6f57',
    },
    checkBoxContainer: {
      backgroundColor: colors.background,
      alignItems: 'center',
      height: Sizes.hp_half,
      width: wp('94%'),
      paddingBottom: Sizes.wp1_3rd,
    },
    checkBox: {
      flexDirection: 'row',
    },
    cuisines: {
      alignItems: 'center',
      width: wp('28.5%'),
      paddingBottom: Sizes.hp10,
    },
    cuisineListContainer: {
      alignItems: 'center',
      paddingBottom: Sizes.hp10,
    },
    counterContainer: {
      paddingVertical: Sizes.hp10,
      alignItems: 'center',
    },
    close: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      height: Sizes.hp1_4th,
      width: wp('94%'),
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
            numColumns={columns}
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

export default SelectCuisines;
