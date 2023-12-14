import type React from 'react';

import type { IrisElementInstance } from '@/types/ui-types';

import { usePushComponent } from '../hooks';

export type IrisTextProps = IrisElementInstance<'text'>['props'];

export const IrisText: React.FC<IrisTextProps> = () => {
  usePushComponent();
  return null;
};
