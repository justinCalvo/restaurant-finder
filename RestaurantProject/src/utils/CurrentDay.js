import React, { useState, useEffect, useCallback } from 'react';
import { Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';

import { Sizes } from '../constants/ResponsiveSizes';

const CurrentDay = ({ index, openingHours }) => {
  const [displayCurrentSchedule, setDisplayCurrentSchedule] = useState('');
  const details = useSelector(state => state.details);

  var today = new Date();
  var day = today.getDay();

  const currentSchedule = useCallback(() => {
    let currentDay;
    if (day === 0) {
      currentDay = 6;
    } else if (day === 6) {
      currentDay = 0;
    } else {
      day--;
      currentDay = day;
    }
    const getIndex =
      index === undefined
        ? openingHours[currentDay].indexOf(':')
        : details.details[index].opening_hours.weekday_text[currentDay].indexOf(
            ':',
          );

    const timesOnly =
      index === undefined
        ? openingHours[currentDay].substr(getIndex + 1)
        : details.details[index].opening_hours.weekday_text[currentDay].substr(
            getIndex + 1,
          );

    setDisplayCurrentSchedule(timesOnly);
  }, [day, index, openingHours, details.details]);

  useEffect(() => {
    currentSchedule();
  }, [currentSchedule, day]);

  const { colors } = useTheme();

  const styles = StyleSheet.create({
    text: {
      textAlign: 'center',
      fontSize: Sizes.hp18,
      fontWeight: 'bold',
      color: colors.text,
    },
  });

  return (
    <>
      <Text style={styles.text}>Today:</Text>
      <Text style={styles.text}>{displayCurrentSchedule}</Text>
    </>
  );
};

export default CurrentDay;
