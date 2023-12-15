import React from 'react';
import { v4 } from 'uuid';

import { IrisLens, type IrisLensOp } from '@/types/iris-lens';
import type { IrisElementInstance, IUIElement } from '@/types/ui-types';

export type IrisRemoteElement<
  T = any,
  Element extends IUIElement = IUIElement
> = {
  element: Element;
  parent: IrisRemoteElement<T, Element> | null;
  key: string;
  lens: IrisLensOp<IrisElementInstance<'root'>, Element>;
  fc: <P>(props: P & React.PropsWithChildren<P>) => Iterable<T>;
};
export const reactToIrisTree =
  (parent?: IrisRemoteElement<React.ReactElement> | null) =>
  <P>(
    element: React.ReactElement<
      React.PropsWithChildren<P>,
      React.FC<React.PropsWithChildren<P>>
    >
  ) => {
    const { children, ...props } = element.props;
    if (typeof element.type === 'string') {
      throw new Error('React element type must be a function');
    }
    const _tag = element.type.name;
    const key = v4();
    const lens = parent?.lens
      ? IrisLens.compose(
          parent.lens,
          IrisLens.compose(
            IrisLens.prop('children'),
            IrisLens.itemByProp('key', key)
          )
        )
      : IrisLens.identity();

    return {
      element: {
        _tag,
        props: { ...props, key: element.key, children },
        children: [],
        key,
      },
      parent,
      key,
      lens,
      fc: (_props) => {
        const result = element.type(
          _props as unknown as P & React.PropsWithChildren<P>
        );
        if (
          typeof result === 'string' ||
          typeof result === 'number' ||
          typeof result === 'boolean' ||
          typeof result === 'undefined'
        ) {
          throw new Error(
            'React element type must return React.ReactElement or array of React.ReactElement'
          );
        }
        if (result === null) {
          return [];
        }
        if (Array.isArray(result)) {
          return result;
        }
        if (React.isValidElement(result)) {
          if (result.type === React.Fragment) {
            return React.Children.toArray(result.props.children);
          }
          return [result];
        }
      },
    } as IrisRemoteElement<React.ReactElement>;
  };
