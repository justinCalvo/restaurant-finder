import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { Drawer, Text, TouchableRipple, Switch } from 'react-native-paper';
import { DrawerContentScrollView } from '@react-navigation/drawer';

export function HomeDrawerContent(props) {
  const [isDark, setIsDark] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView {...props}>
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
