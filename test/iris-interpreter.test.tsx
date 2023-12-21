/* eslint-disable */
import type { IrisOperationReducer } from '@/core/iris-interpreter';
import { irisInterpreterFactory } from '@/core/iris-interpreter';
import { irisDispatchHandler } from '@/core/iris-interpreter/operation-handlers/dispatch-handler';
import type { IGameState } from '@/state/ui-state';
import type { IrisDispatchOp } from '@/types/iris-action';
import type { BaseIrisOp } from '@/types/iris-op-types';
import { IrisKind } from '@/types/iris-op-types';

describe('irisInterpreter', () => {
  const mockHandler: IrisOperationReducer = (state) => (op) => state;
  const mockState: IGameState = {}; // replace with actual initial state
  const mockOp: BaseIrisOp = {}; // replace with actual operation

  const irisInterpreter = irisInterpreterFactory(mockHandler);

  it('should return initial state when operation list is empty', () => {
    const newState = irisInterpreter(mockState)([]);
    expect(newState).toBe(mockState);
  });

  it('should call handler for each operation in operation list', () => {
    const mockHandler = jest.fn(
      (state: IGameState) => (op: BaseIrisOp) => state
    );
    const irisInterpreter = irisInterpreterFactory(mockHandler);
    irisInterpreter(mockState)([mockOp, mockOp]);
    expect(mockHandler).toHaveBeenCalledTimes(2);
  });
});
describe('irisDispatchHandler', () => {
  const mockState: IGameState = {
    actionsQueue: [],
    // add other properties of IGameState
  };

  const mockOp: IrisDispatchOp = {
    kind: IrisKind.Dispatch,
    actions: [
      {
        action: 'mockAction',
        args: [],
        kind: IrisKind.Action,
      },
      {
        action: 'mockAction',
        args: [],
        kind: IrisKind.Action,
      },
    ],
    // add other properties of IrisDispatchOp
  };

  const mockPrev = jest.fn((state: IGameState) => (op: BaseIrisOp) => state);

  it('should return initial state when operation is not IrisDispatch', () => {
    const newState = irisDispatchHandler(mockPrev)(mockState)(
      {} as IrisDispatchOp
    );
    expect(newState).toBe(mockState);
  });

  it('should add actions from operation to actionsQueue when operation is IrisDispatch', () => {
    const newState = irisDispatchHandler(mockPrev)(mockState)(mockOp);
    expect(newState.actionsQueue).toEqual([
      ...mockState.actionsQueue,
      ...mockOp.actions,
    ]);
  });

  it('should not call previous handler when operation is IrisDispatch', () => {
    const mockPrev = jest.fn((state: IGameState) => (op: BaseIrisOp) => state);
    irisDispatchHandler(mockPrev)(mockState)(mockOp);
    expect(mockPrev).not.toHaveBeenCalled();
  });
});
