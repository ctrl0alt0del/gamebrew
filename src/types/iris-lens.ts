import type { BaseIrisOp } from './iris-op-types';
import { IrisKind } from './iris-op-types';

export enum IrisLensKind {
  Prop,
  Index,
  ItemByProp,
  Identity,
  Composed,
}

export interface BaseIrisLensOp<K extends IrisLensKind, _A, _B>
  extends BaseIrisOp<IrisKind.Lens> {
  lensKind: K;
}

export type IrisLensOp<A, B> = BaseIrisLensOp<IrisLensKind, A, B>;

export interface IrisPropLensOp<A extends Record<string, any>, B>
  extends BaseIrisLensOp<IrisLensKind.Prop, A, B> {
  prop: {
    [K in keyof A]: A[K] extends B ? K : never;
  }[keyof A];
}

export interface IrisIndexLensOp<A extends Array<B>, B>
  extends BaseIrisLensOp<IrisLensKind.Index, A, B> {
  index: number;
}

export interface IrisItemByPropLensOp<A extends Array<B>, B>
  extends BaseIrisLensOp<IrisLensKind.ItemByProp, A, B> {
  prop: keyof B;
}

export interface IrisIdentityLensOp<A>
  extends BaseIrisLensOp<IrisLensKind.Identity, A, A> {}

export interface IrisComposedLensOp<A, B, C>
  extends BaseIrisLensOp<IrisLensKind.Composed, A, C> {
  outer: BaseIrisLensOp<any, A, B>;
  inner: BaseIrisLensOp<any, B, C>;
}

export const IrisLens = {
  prop: <A extends Record<string, any>, B>(
    prop: keyof A
  ): IrisPropLensOp<A, B> => ({
    kind: IrisKind.Lens,
    lensKind: IrisLensKind.Prop,
    prop: prop as any,
  }),
  index: <A extends Array<B>, B>(index: number): IrisIndexLensOp<A, B> => ({
    kind: IrisKind.Lens,
    lensKind: IrisLensKind.Index,
    index,
  }),
  itemByProp: <A extends Array<B>, B>(
    prop: keyof B
  ): IrisItemByPropLensOp<A, B> => ({
    kind: IrisKind.Lens,
    lensKind: IrisLensKind.ItemByProp,
    prop: prop as any,
  }),
  identity: <A>(): IrisIdentityLensOp<A> => ({
    kind: IrisKind.Lens,
    lensKind: IrisLensKind.Identity,
  }),
  compose: <A, B, C>(
    outer: BaseIrisLensOp<any, A, B>,
    inner: BaseIrisLensOp<any, B, C>
  ): IrisComposedLensOp<A, B, C> => ({
    kind: IrisKind.Lens,
    lensKind: IrisLensKind.Composed,
    outer,
    inner,
  }),
};
