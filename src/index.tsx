import 'react-native-gesture-handler';

import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';

import { loadSelectedTheme } from '@/core';

import { SafeAreaView, Text } from './ui';
import { IrisPressable } from './ui/system/ui-composer/renderer-lib/ui-pressable';
import { IrisText } from './ui/system/ui-composer/renderer-lib/ui-text';
import { factoryUIElementRenderer } from './ui/system/ui-composer/ui-element-renderer';

loadSelectedTheme();
SplashScreen.preventAutoHideAsync();

const Renderer = factoryUIElementRenderer({
  text: IrisText,
  pressable: IrisPressable,
});

const App = () => {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);
  return (
    <SafeAreaView className="h-screen bg-white">
      <Text>Hello World</Text>
    </SafeAreaView>
  );
};

export default App;
