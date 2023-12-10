import 'react-native-gesture-handler';

import * as SplashScreen from 'expo-splash-screen';
import { NativeWindStyleSheet } from 'nativewind';
import React, { useEffect } from 'react';

import {
  factoryUIElementRenderer,
  RenderIrisPressable,
  RenderIrisText,
  UIStateRenderer,
} from '@/ui/system';

NativeWindStyleSheet.setColorScheme('light');
SplashScreen.preventAutoHideAsync();

const Renderer = factoryUIElementRenderer({
  text: RenderIrisText,
  pressable: RenderIrisPressable,
});

const App = () => {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);
  return <UIStateRenderer Renderer={Renderer} />;
};

export default App;
