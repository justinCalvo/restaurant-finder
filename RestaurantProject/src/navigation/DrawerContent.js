import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, View, StyleSheet, Alert } from 'react-native';
import {
  Drawer,
  Text,
  TouchableRipple,
  Switch,
  useTheme,
} from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';

import RNRestart from 'react-native-restart';
import Clipboard from '@react-native-community/clipboard';

import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { SettingContext } from './components/Context';

export function DrawerContent(props) {
  const { toggleTheme } = React.useContext(SettingContext);

  const [wasCopied, setWasCopied] = useState(false);

  const places = useSelector(state => state.places);
  const query = useSelector(state => state.query);

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

  const paperTheme = useTheme();
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
      alignItems: 'center',
    },
    text: {
      color: colors.text,
    },
    cuisines: {
      paddingBottom: 5,
      paddingHorizontal: 16,
    },
  });

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
                color={wasCopied ? 'green' : colors.text}
              />
            </View>
          </TouchableRipple>
        </Drawer.Section>
        {query.cuisineList.length > 0 ? (
          <Drawer.Section
            style={styles.preferenceContainer}
            title={
              query.cuisineList.length > 1
                ? 'Preferred Cuisines'
                : 'Preferred Cuisine'
            }>
            <View style={styles.cuisines}>
              <Text style={styles.text}>{query.cuisineList[0].cuisine}</Text>
            </View>
            {query.cuisineList[1] ? (
              <View style={styles.cuisines}>
                <Text style={styles.text}>{query.cuisineList[1].cuisine}</Text>
              </View>
            ) : null}
            {query.cuisineList[2] ? (
              <View style={styles.cuisines}>
                <Text style={styles.text}>{query.cuisineList[2].cuisine}</Text>
              </View>
            ) : null}
            {query.cuisineList[3] ? (
              <View style={styles.cuisines}>
                <Text style={styles.text}>{query.cuisineList[3].cuisine}</Text>
              </View>
            ) : null}
          </Drawer.Section>
        ) : null}
        <Drawer.Section style={styles.preferenceContainer} title="Preferences">
          <TouchableRipple onPress={() => toggleTheme()}>
            <View style={styles.preference}>
              <Text style={styles.text}>Dark Mode</Text>
              <View pointerEvents="none">
                <Switch value={paperTheme.dark} color="#ee6f57" />
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
