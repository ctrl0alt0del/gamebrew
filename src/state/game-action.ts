import type { IrisActionOp } from '@/types/iris-action';

export type GameAction<P extends Array<any> = any[]> = Omit<
  IrisActionOp<P>,
  'kind'
>;
