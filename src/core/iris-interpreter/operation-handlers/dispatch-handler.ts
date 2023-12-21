import type { IGameState } from '@/state/ui-state';
import type { IrisDispatchOp } from '@/types/iris-action';
import { IrisDispatch } from '@/types/iris-action';

import type { IrisOperationReducerFactory } from '..';

const dispatchToState = (state: IGameState) => (op: IrisDispatchOp) => ({
  ...state,
  actionsQueue: [...state.actionsQueue, ...op.actions],
});

export const irisDispatchHandler: IrisOperationReducerFactory =
  (prev) => (state) => (op) =>
    IrisDispatch.is(op)
      ? dispatchToState(state)(op)
      : prev?.(state)(op) ?? state;
