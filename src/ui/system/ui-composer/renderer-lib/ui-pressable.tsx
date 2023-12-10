import React from 'react';

import { Pressable } from '@/ui/core';

import type { IrisElementHandler } from '../ui-element-renderer';

export const RenderIrisPressable: IrisElementHandler<'pressable'> = ({
  onPress,
  ...props
}) => {
  return <Pressable {...props} onPress={onPress} />;
};
