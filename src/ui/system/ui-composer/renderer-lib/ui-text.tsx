import React from 'react';

import { Text } from '@/ui/core';

import type { IrisElementHandler } from '../ui-element-renderer';

export const IrisText: IrisElementHandler<'text'> = ({ text, ...props }) => {
  return <Text {...props}>{text}</Text>;
};
