import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './navigation/MainStack';
console.disableYellowBox = true;

const App = () => {
  console.disableYellowBox = true;

  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};

export default App;
