import React from 'react';

import { Text } from '@/ui/core';

import type { IrisElementHandler } from '../ui-element-renderer';

export const RenderIrisText: IrisElementHandler<'text'> = ({
  text,
  ...props
}) => {
  return <Text {...props}>{text}</Text>;
};
