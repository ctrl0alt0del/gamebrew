import type { GameAction } from './game-action';
import type { IGameState } from './ui-state';

export type ActionReducer = (
  state: IGameState
) => (op: GameAction) => IGameState;

export const ActionReducers = {
  compose: (...reducers: ActionReducer[]): ActionReducer => {
    return (state) => (op) =>
      reducers.reduce((acc, reducer) => reducer(acc)(op), state);
  },
};
