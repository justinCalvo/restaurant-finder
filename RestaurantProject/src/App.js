import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { YellowBox } from 'react-native';
import { Provider } from 'react-redux';

import RootStack from './navigation/RootStack';
import store from './redux/store';

import { SettingContext } from './navigation/components/Context';

YellowBox.ignoreWarnings([
  'Received data was not a string, or was not a recognised encoding.',
  'Non-serializable values were found in the navigation state',
]);
console.disableYellowBox = true;

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#fafafa',
      text: '#1C2938',
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#1C2938',
      text: '#fafafa',
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const settingContext = React.useMemo(
    () => ({
      toggleTheme: () => {
        setIsDarkTheme(bool => !bool);
      },
    }),
    [],
  );

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <SettingContext.Provider value={settingContext}>
          <NavigationContainer theme={theme}>
            <RootStack />
          </NavigationContainer>
        </SettingContext.Provider>
      </PaperProvider>
    </Provider>
  );
};

export default App;
