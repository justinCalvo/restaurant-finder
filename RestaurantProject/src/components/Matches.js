import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

const Matches = () => {
  const styles = StyleSheet.create({
    container: {
      paddingTop: 10,
      paddingBottom: 10,
      marginBottom: 10,
      marginTop: 10,
    },
    banner: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 18,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.banner}>Matches</Text>
    </SafeAreaView>
  );
};
export default Matches;
