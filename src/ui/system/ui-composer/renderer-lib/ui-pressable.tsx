import React from 'react';

import { Pressable } from '@/ui/core';

import type { IrisElementHandler } from '../ui-element-renderer';

export const IrisPressable: IrisElementHandler<'pressable'> = ({
  onPress,
  ...props
}) => {
  return <Pressable {...props} onPress={onPress} />;
};
