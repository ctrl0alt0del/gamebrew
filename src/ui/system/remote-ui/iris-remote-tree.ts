import type React from 'react';

import type { IrisLensOp } from '@/types/iris-lens';
import type { IrisElementInstance, IUIElement } from '@/types/ui-types';

export type IrisRemoteElement<Element extends IUIElement = any> = {
  element: IrisRemoteElement<Element>;
  parent: IrisRemoteElement<Element> | null;
  key: string;
  lens: IrisLensOp<IrisElementInstance<'root'>, Element>;
};

export const reactToIrisTree =
  (parent?: IrisRemoteElement) => (element: React.ReactElement) => {
    const { children, ...props } = element.props;
    const _tag =
      typeof element.type === 'string' ? element.type : element.type.name;
    const irisElement: IrisRemoteElement = {
      element: {
        _tag,
        props: { ...props, key: element.key },
        children: children.map(reactToIrisTree()),
        key: element.key,
      },
      parent,
      key: element.key,
      lens: null,
    };
    return irisElement;
  };
