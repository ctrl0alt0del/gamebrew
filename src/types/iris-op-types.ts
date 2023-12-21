export enum IrisKind {
  Value,
  Stream,
  Action,
  Lens,
  Listen,
  Dispatch,
}

export type IrisOpKind = IrisKind.Listen | IrisKind.Dispatch;

export type IrisValue<_T> = {
  kind: IrisKind.Value;
  id: string;
};

export type Stream<T> = {
  kind: IrisKind.Stream;
  id: string;
  value: IrisValue<T>;
};

export interface BaseIrisOp<OpType extends IrisKind = IrisKind> {
  kind: OpType;
}

export interface IrisListenOp<T> extends BaseIrisOp<IrisKind.Listen> {
  stream: Stream<T>;
  ops: BaseIrisOp[];
}

const IrisKindValues = Object.values(IrisKind);

export const isIrisOp = (op: any): op is BaseIrisOp =>
  op && IrisKindValues.includes(op.kind);

export const isIrisListenOp = (op: BaseIrisOp<any>): op is IrisListenOp<any> =>
  op.kind === IrisKind.Listen;
