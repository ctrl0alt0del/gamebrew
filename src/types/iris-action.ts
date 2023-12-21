import type { IrisActionsKind } from '@/core/iris-actions-lib/iris-action-def';

import type { BaseIrisOp } from './iris-op-types';
import { IrisKind } from './iris-op-types';

export interface IrisActionOp<P extends Array<any> = any[]>
  extends BaseIrisOp<IrisKind.Action> {
  action: IrisActionsKind;
  args: P;
}

export interface IrisDispatchOp extends BaseIrisOp<IrisKind.Dispatch> {
  actions: IrisActionOp[];
}

export const IrisActions = {
  create: <T extends any[]>(
    action: IrisActionsKind,
    ...args: T
  ): IrisActionOp<T> => ({
    kind: IrisKind.Action,
    action,
    args,
  }),
};

export const IrisDispatch = {
  create: (...actions: IrisActionOp[]): IrisDispatchOp => ({
    kind: IrisKind.Dispatch,
    actions,
  }),
  is: (op: any): op is IrisDispatchOp => op.kind === IrisKind.Dispatch,
};
