export enum IrisKind {
  Value,
  Stream,
  Lens,
  Listen,
  Dispatch,
}

export type IrisOpKind = IrisKind.Listen | IrisKind.Dispatch;

export type Action = {
  name: string;
  payload: {
    [key: string]: any;
  };
};

export type IrisValue<_T> = {
  kind: IrisKind.Value;
  id: string;
};

export type Stream<T> = {
  kind: IrisKind.Stream;
  id: string;
  value: IrisValue<T>;
};

export interface BaseIrisOp<OpType extends IrisKind = any> {
  kind: OpType;
}

export interface IrisListenOp<T> extends BaseIrisOp<IrisKind.Listen> {
  stream: Stream<T>;
  ops: BaseIrisOp[];
}

export const isIrisListenOp = (op: BaseIrisOp<any>): op is IrisListenOp<any> =>
  op.kind === IrisKind.Listen;
