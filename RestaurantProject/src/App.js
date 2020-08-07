import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './navigation/RootStack';
import { YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import store from './redux/store';

YellowBox.ignoreWarnings([
  'Received data was not a string, or was not a recognised encoding.',
  'Non-serializable values were found in the navigation state',
]);
console.disableYellowBox = true;

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
