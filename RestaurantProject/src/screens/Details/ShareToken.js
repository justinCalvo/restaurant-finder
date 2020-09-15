import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Routes } from '../../constants/NavConst';

import Clipboard from '@react-native-community/clipboard';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ShareToken = ({ navigation }) => {
  const [dataReady, setDataReady] = useState(false);
  const [wasCopied, setWasCopied] = useState(false);

  const places = useSelector(state => state.places);
  const details = useSelector(state => state.details);

  const handleDataReady = useCallback(() => {
    if (details.details.length > 0) {
      setDataReady(true);
    } else {
      setDataReady(false);
    }
  }, [details.details]);

  useEffect(() => {
    handleDataReady();
  });

  const copyToClipboard = () => {
    Clipboard.setString(places.sessionID);
    setWasCopied(true);
  };

  const resetWasCopied = useCallback(() => {
    if (wasCopied) {
      setTimeout(() => {
        setWasCopied(false);
      }, 3000);
    }
  }, [wasCopied]);

  useEffect(() => {
    resetWasCopied();
  }, [resetWasCopied, wasCopied]);

  return (
    <View style={styles.container}>
      <View style={styles.sessionIDContainer}>
        <Text style={styles.headerText}>Share your token:</Text>
        <TouchableOpacity onPress={() => copyToClipboard()}>
          <View style={styles.sessionToken}>
            <Text style={styles.text}>{places.sessionID}</Text>
            {wasCopied ? <Text style={styles.text}>Copied!</Text> : null}
            <FontAwesome
              name={wasCopied ? 'check-square' : 'copy'}
              size={24}
              color={wasCopied ? 'green' : '#1C2938'}
            />
          </View>
        </TouchableOpacity>
      </View>
      {dataReady ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate(Routes.Place)}>
            <View style={styles.continue}>
              <Text>Continue</Text>
              <Ionicons
                name="arrow-forward-outline"
                size={30}
                color="#1C2938"
              />
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
  },
  sessionIDContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 4,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  continue: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  sessionToken: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    alignItems: 'center',
    width: width / 1.4,
  },
  headerText: {
    paddingVertical: 10,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C2938',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C2938',
  },
});

export default ShareToken;
