import type { ActionReducer } from '@/state/action-reducer';
import type { IGameState } from '@/state/ui-state';
import type { BaseIrisOp } from '@/types/iris-op-types';

import { irisInterpreter } from '../iris-interpreter';

export const bootstrapGame = (
  initialState: IGameState,
  reducer: StateSelfReducer
) => {
  const hydratedInterpreter = irisInterpreter(initialState);
  return (opList: BaseIrisOp[]) => reducer(hydratedInterpreter(opList));
};

//TODO: come up with better name (maybe StateFunctor?)
type StateSelfReducer = (state: IGameState) => IGameState;
const processActionsQueue = (reducer: ActionReducer) =>
  function reduceActions(state: IGameState): IGameState {
    if (state.actionsQueue.length === 0) {
      return state;
    }

    const newState = state.actionsQueue.reduce(
      (currentState, action) => reducer(currentState)(action),
      state
    );

    return reduceActions(newState);
  };
