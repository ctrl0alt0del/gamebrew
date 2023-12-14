import { IrisActionsLib } from '@/core/iris-actions-lib';
import { IrisDispatch } from '@/types/iris-action';
import { IrisLens } from '@/types/iris-lens';

import { useIrisCompile } from './default-compiler';

export const usePushComponent = () =>
  useIrisCompile((el) => [
    IrisDispatch.create(
      IrisActionsLib.pushIrisElement(el.element, el.lens ?? IrisLens.identity())
    ),
  ]);
