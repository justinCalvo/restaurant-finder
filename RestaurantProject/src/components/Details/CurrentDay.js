import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const CurrentDay = ({ index }) => {
  const [displayCurrentSchedule, setDisplayCurrentSchedule] = useState('');
  const state = useSelector(state => state.details);

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
    const getIndex = state.details[index].opening_hours.weekday_text[
      currentDay
    ].indexOf(':');
    const timesOnly = state.details[index].opening_hours.weekday_text[
      currentDay
    ].substr(getIndex + 1);
    setDisplayCurrentSchedule(timesOnly);
  }, [day, index, state.details]);

  useEffect(() => {
    currentSchedule();
  }, [currentSchedule, day]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Today:</Text>
      <Text style={styles.text}>{displayCurrentSchedule}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
  },
});

export default CurrentDay;
