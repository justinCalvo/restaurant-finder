import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Share,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Routes } from '../../constants/NavConst';
import { useTheme } from '@react-navigation/native';

import Clipboard from '@react-native-community/clipboard';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { Sizes } from '../../constants/ResponsiveSizes';

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

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Where would you like to send this token?',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const shareAndCopy = () => {
    copyToClipboard();
    onShare();
  };

  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      width: Sizes.wp_full,
      height: Sizes.hp_full,
    },
    sessionIDContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 4,
    },
    buttonContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: Sizes.hp10,
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
      paddingVertical: Sizes.hp10,
      alignItems: 'center',
      width: Sizes.wp4_5th,
    },
    headerText: {
      paddingVertical: Sizes.hp10,
      fontSize: Sizes.hp28,
      fontWeight: 'bold',
      color: colors.text,
    },
    text: {
      fontSize: Sizes.hp18,
      fontWeight: 'bold',
      color: colors.text,
    },
    shareTokenContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.sessionIDContainer}>
        <TouchableOpacity onPress={shareAndCopy}>
          <View style={styles.shareTokenContainer}>
            <Text style={styles.headerText}>Share your token </Text>
            <FontAwesome name="share-alt" size={Sizes.hp24} color="#cb3737" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => copyToClipboard()}>
          <View style={styles.sessionToken}>
            <Text style={styles.text}>{places.sessionID}</Text>
            {wasCopied ? <Text style={styles.text}>Copied!</Text> : null}
            <FontAwesome
              name={wasCopied ? 'check-square' : 'copy'}
              size={Sizes.hp24}
              color={wasCopied ? 'green' : colors.text}
            />
          </View>
        </TouchableOpacity>
      </View>
      {dataReady ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate(Routes.Place)}>
            <View style={styles.continue}>
              <Text style={styles.text}>Continue</Text>
              <Ionicons
                name="arrow-forward-outline"
                size={Sizes.hp30}
                color={colors.text}
              />
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default ShareToken;
