import { type IrisActionOp, IrisActions } from '@/types/iris-action';
import type { IrisLensOp } from '@/types/iris-lens';
import type { IrisElementInstance, IUIElement } from '@/types/ui-types';

export enum IrisActionsKind {
  PushIrisElement = 'pushIrisElement',
}

export type IrisActionPayloadItem =
  | string
  | number
  | boolean
  | null
  | undefined
  | IrisLensOp<any, any>;

export type IrisSupportedActionPayload<K extends IrisActionsKind> =
  K extends IrisActionsKind.PushIrisElement
    ? [IUIElement, IrisLensOp<IrisElementInstance<'root'>, IUIElement>]
    : never;

export const IrisActionsLib: {
  [key in IrisActionsKind]: <P extends IrisSupportedActionPayload<key>>(
    ...args: P
  ) => IrisActionOp<P>;
} = {
  pushIrisElement: (
    item: IUIElement,
    lens: IrisLensOp<IrisElementInstance<'root'>, IUIElement>
  ) => IrisActions.create(IrisActionsKind.PushIrisElement, item, lens) as any,
};
