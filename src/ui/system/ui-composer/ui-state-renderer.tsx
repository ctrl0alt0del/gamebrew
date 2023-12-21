import React from 'react';

import { useGameStore } from '@/state/ui-state';
import { SafeAreaView } from '@/ui/core';

import type { UIElementRenderer } from './ui-element-renderer';

type UIElementRendProps = {
  Renderer: UIElementRenderer;
};

export const UIStateRenderer = ({ Renderer }: UIElementRendProps) => {
  const { root } = useGameStore();
  return (
    <SafeAreaView className="h-screen bg-white">
      <Renderer element={root} />
    </SafeAreaView>
  );
};
