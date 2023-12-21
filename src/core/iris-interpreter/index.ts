import type { IGameState } from '@/state/ui-state';
import type { BaseIrisOp } from '@/types/iris-op-types';

import { irisDispatchHandler } from './operation-handlers/dispatch-handler';

export type IrisOperationReducer = (
  state: IGameState
) => (op: BaseIrisOp) => IGameState;
export type IrisOperationReducerFactory = (
  prev?: IrisOperationReducer
) => IrisOperationReducer;

export const irisInterpreterFactory =
  (handler: IrisOperationReducer) =>
  (state: IGameState) =>
  (opList: BaseIrisOp[]): IGameState =>
    opList.reduce((acc, op) => handler(acc)(op), state);

export const irisInterpreter = irisInterpreterFactory(irisDispatchHandler());
