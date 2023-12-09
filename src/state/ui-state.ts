import { createSelectors } from '@/core';
import { IUIElement } from '@/types/ui-types';
import { create } from 'zustand';

export interface IUIState {
  root: IUIElement<any>;
}

const uiStore = create<IUIState>((set, get) => ({
  root: {
    _tag: 'root',
    props: {},
    children: [],
  },
}));

export const useUIStore = createSelectors(uiStore);
