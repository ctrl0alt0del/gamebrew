import 'react-native-gesture-handler';

import * as SplashScreen from 'expo-splash-screen';
import React from 'react';

import { loadSelectedTheme } from '@/core';

import { Text } from './ui';

loadSelectedTheme();
SplashScreen.preventAutoHideAsync();

const App = () => {
  return <Text>Hello World</Text>;
};

export default App;
