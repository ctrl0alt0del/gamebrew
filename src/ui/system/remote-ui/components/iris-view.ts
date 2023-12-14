import type React from 'react';

import type { IrisElementInstance } from '@/types/ui-types';

import { usePushComponent } from '../hooks';

export type IrisViewProps = React.PropsWithChildren<
  IrisElementInstance<'view'>['props']
>;

export const IrisView: React.FC<IrisViewProps> = ({
  children,
}: IrisViewProps) => {
  usePushComponent();
  return children;
};
