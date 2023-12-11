import React from 'react';

import { type Lens, LensUtils } from '@/core/lens';
import { irisRenderIrisElementOp } from '@/types/general';
import type {
  IrisElement,
  IrisElementProps,
  IrisElementTags,
  IUIElement,
  RootElement,
} from '@/types/ui-types';

import { useIrisCompile } from './deafult-compiler';

const ParentUIStateLens = React.createContext<Lens<
  RootElement,
  IrisElement
> | null>(null);

const childrenLens = LensUtils.prop<IrisElement, IrisElement[]>('children');
const childItemLens = function <
  T extends IrisElementTags,
  P extends IrisElementProps<T>
>(key: string) {
  return LensUtils.compose(
    childrenLens,
    LensUtils.itemByProp<IrisElement[], IUIElement<T, P>>('key', key)
  );
};

export const factoryRemoteRenderable = <T extends IrisElementTags>(_tag: T) => {
  const RemoteRenderable = () => {
    return useIrisCompile((el) => [irisRenderIrisElementOp(el)]);
  };
  return RemoteRenderable;
};
