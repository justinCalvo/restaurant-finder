import 'react-native-gesture-handler';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { YellowBox } from 'react-native';
import { Provider } from 'react-redux';

import RootStack from './navigation/RootStack';
import store from './redux/store';

YellowBox.ignoreWarnings([
  'Received data was not a string, or was not a recognised encoding.',
  'Non-serializable values were found in the navigation state',
]);
console.disableYellowBox = true;

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
