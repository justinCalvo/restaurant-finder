import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, View, StyleSheet, Alert } from 'react-native';
import { Drawer, Text, TouchableRipple, Switch } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';

import RNRestart from 'react-native-restart';
import Clipboard from '@react-native-community/clipboard';

import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export function DrawerContent(props) {
  const [isDark, setIsDark] = useState(false);
  const [wasCopied, setWasCopied] = useState(false);
  const places = useSelector(state => state.places);

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
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView {...props}>
        <Drawer.Section style={styles.preferenceContainer} title="Share Token">
          <TouchableRipple onPress={() => copyToClipboard()}>
            <View style={styles.preference}>
              <Text style={styles.text}>{places.sessionID}</Text>
              {wasCopied ? <Text style={styles.text}>Copied!</Text> : null}
              <FontAwesome
                name={wasCopied ? 'check-square' : 'copy'}
                size={22}
                color={wasCopied ? 'green' : '#1C2938'}
              />
            </View>
          </TouchableRipple>
        </Drawer.Section>
        <Drawer.Section style={styles.preferenceContainer} title="Preferences">
          <TouchableRipple onPress={() => setIsDark(!isDark)}>
            <View style={styles.preference}>
              <Text style={styles.text}>Dark Mode</Text>
              <View pointerEvents="none">
                <Switch value={isDark} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>
        <Drawer.Section>
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="exit-outline" color={color} size={size} />
            )}
            label="Leave Session"
            onPress={() => {
              Alert.alert(
                'Hold on!',
                'Are you sure you want to leave your current session?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel',
                  },
                  { text: 'YES', onPress: () => RNRestart.Restart() },
                ],
              );
            }}
            inactiveTintColor="#1C2938"
            inactiveBackgroundColor="#e3e3e3"
          />
        </Drawer.Section>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  preferenceContainer: {
    backgroundColor: '#fafafa',
  },
  text: {
    color: '#1C2938',
  },
});
