import React from 'react';
import { SafeAreaView, View, StyleSheet, Button } from 'react-native';
import {
  Drawer,
  Text,
  TouchableRipple,
  Switch,
  useTheme,
} from 'react-native-paper';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { findSession } from '../../API/findSession.js';
import { SettingContext } from './Context';

import { Sizes } from '../../constants/ResponsiveSizes';

export function HomeDrawerContent(props) {
  const { toggleTheme } = React.useContext(SettingContext);

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
      paddingVertical: Sizes.hp12,
      paddingHorizontal: Sizes.hp14,
      alignItems: 'center',
    },
    text: {
      color: colors.text,
      fontSize: Sizes.hp14,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView {...props}>
        <Drawer.Section title="Preferences">
          <TouchableRipple onPress={() => toggleTheme()}>
            <View style={styles.preference}>
              <Text style={styles.text}>Dark Mode</Text>
              {/* <Button
                onPress={() => {
                  findSession('16-vHyHBDwLGxFkD');
                }}
                title="TEST SESSION"
              /> */}
              <View pointerEvents="none">
                <Switch value={paperTheme.dark} color="#ee6f57" />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
}
