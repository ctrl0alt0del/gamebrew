import React, { useContext, useEffect } from 'react';
import { v4 } from 'uuid';

import { type Lens, LensUtils } from '@/core/lens';
import { useUILens } from '@/state/ui-state';
import type {
  IrisElement,
  IrisElementProps,
  IrisElementTags,
  IUIElement,
  RootElement,
} from '@/types/ui-types';

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
  const RemoteRenderable = (props: any) => {
    const parentLens = useContext(ParentUIStateLens);
    if (!parentLens) {
      throw new Error('ParentUIStateLens is not provided');
    }
    const { children, ...rest } = props;
    const key = v4();
    const selfLens = LensUtils.compose(
      parentLens,
      childItemLens<T, IrisElementProps<T>>(key)
    );
    const stateLens = useUILens<IUIElement<T, IrisElementProps<T>>>(selfLens);
    const uiElement: IUIElement<T> = {
      _tag,
      key,
      props: rest,
      children: [],
    };
    useEffect(() => {
      stateLens.set(uiElement);
      return () => {};
    }, []);
    return (
      <ParentUIStateLens.Provider value={null}>
        {children}
      </ParentUIStateLens.Provider>
    );
  };
  return RemoteRenderable;
};
