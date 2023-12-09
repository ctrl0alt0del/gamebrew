import React from 'react';

import type { IrisElementInstance, IrisElementTags } from '@/types/ui-types';
import { isIrisElement } from '@/types/ui-types';

type UIElementRendererProps<Tag extends IrisElementTags> = {
  element: IrisElementInstance<Tag>;
};

export type IrisElementHandler<Tag extends IrisElementTags> = React.FC<
  IrisElementInstance<Tag>['props']
>;

export const factoryUIElementRenderer = (map: {
  [K in IrisElementTags]: IrisElementHandler<Extract<IrisElementTags, K>>;
}) => {
  const UIElementRenderer = <Tag extends IrisElementTags>({
    element,
  }: UIElementRendererProps<Tag>) => {
    const { _tag, props, children } = element;
    const Component = map[_tag];
    if (!Component) {
      throw new Error(`No component found for tag ${_tag}`);
    }
    const childrenArray = children?.map((child) => {
      if (isIrisElement(child)) {
        return <UIElementRenderer element={child} />;
      } else {
        return child;
      }
    }) as React.ReactNode[];
    return <Component {...{ ...props, children: childrenArray }} />;
  };

  return UIElementRenderer;
};
