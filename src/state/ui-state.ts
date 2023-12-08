import { IUIElement } from '@/types/ui-types';
import { create } from 'zustand';

export interface IUIState {
  root: IUIElement<any>;
}

const uiStore = create<IUIState>((set, get) => ({
  root: {
    _tag: 'root',
    attributes: {},
    children: [],
  },
}));

const useUIStore = createSe;
