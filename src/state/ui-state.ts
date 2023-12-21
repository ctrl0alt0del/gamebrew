import { create } from 'zustand';

import { createSelectors } from '@/core';
import { Func } from '@/core/func';
import type { Lens } from '@/core/lens';
import { LensUtils } from '@/core/lens';
import type { IrisActionOp } from '@/types/iris-action';
import type { RootElement } from '@/types/ui-types';

export interface IGameState {
  root: RootElement;
  actionsQueue: IrisActionOp[];
  setUITree: (tree: RootElement) => void;
}

export const gameStore = create<IGameState>((set) => ({
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

export const useGameStore = createSelectors(gameStore);

export const useUILens = <T>(lens?: Lens<IGameState['root'], T>) => {
  const { root, setUITree } = useGameStore();
  return LensUtils.create<void, T>(
    () => lens.get(root),
    (t: T) => Func.of(Func.compose(lens.set(t), Func.tap(setUITree))(root))
  );
};
