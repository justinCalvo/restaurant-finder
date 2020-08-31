import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, Alert } from 'react-native';
import { Drawer, Text, TouchableRipple, Switch } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import RNRestart from 'react-native-restart';

export function DrawerContent(props) {
  const [isDark, setIsDark] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView {...props}>
        {/* <Drawer.Section>
          <DrawerItem
            icon={({ focused, color, size }) => (
              <Icon name="home" color={color} size={size} />
            )}
            label="Current Session"
            onPress={() => {
              props.navigation.navigate('Restaurants');
            }}
            inactiveTintColor="#1C2938"
            inactiveBackgroundColor="#e3e3e3"
            activeBackgroundColor="#cb3737"
            activeTintColor="#fafafa"
          />
        </Drawer.Section> */}
        <Drawer.Section style={styles.preferenceContainer} title="Preferences">
          <TouchableRipple onPress={() => setIsDark(!isDark)}>
            <View style={styles.preference}>
              <Text style={styles.text}>Dark Theme</Text>
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
