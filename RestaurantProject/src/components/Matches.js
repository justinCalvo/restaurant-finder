import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Matches = () => {

  const styles = StyleSheet.create({
    container: {
      paddingTop: 10,
      paddingBottom: 10,
    },
    banner: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 18,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.banner}>Matches</Text>
    </View>
  );
};

export default Matches;
