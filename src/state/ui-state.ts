import { create } from 'zustand';

import { createSelectors } from '@/core';
import { Func } from '@/core/func';
import type { Lens } from '@/core/lens';
import { LensUtils } from '@/core/lens';
import type { RootElement } from '@/types/ui-types';

export interface IUIState {
  root: RootElement;
  setUITree: (tree: RootElement) => void;
}

const uiStore = create<IUIState>((set) => ({
  root: {
    _tag: 'root',
    props: {},
    children: [],
    key: 'root',
  },
  setUITree: (tree) => {
    set({ root: tree });
  },
}));

export const useUIStore = createSelectors(uiStore);

export const useUILens = <T>(lens?: Lens<IUIState['root'], T>) => {
  const { root, setUITree } = useUIStore();
  return LensUtils.create<void, T>(
    () => lens.get(root),
    (t: T) => Func.of(Func.compose(lens.set(t), Func.tap(setUITree))(root))
  );
};
