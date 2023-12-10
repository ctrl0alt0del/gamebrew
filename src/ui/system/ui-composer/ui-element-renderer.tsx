import React, { memo } from 'react';

import type { IrisElementInstance, IrisElementTags } from '@/types/ui-types';
import { isIrisElement } from '@/types/ui-types';

type UIElementRendererProps<Tag extends IrisElementTags> = {
  element: IrisElementInstance<Tag>;
};

export type IrisElementHandler<Tag extends IrisElementTags> = React.FC<
  IrisElementInstance<Tag>['props']
>;

export type UIElementRenderer = React.FC<
  UIElementRendererProps<IrisElementTags>
>;

export const factoryUIElementRenderer = (map: {
  [K in Exclude<IrisElementTags, 'root'>]: IrisElementHandler<
    Extract<IrisElementTags, K>
  >;
}) => {
  const UIElementRenderer = memo<UIElementRendererProps<IrisElementTags>>(
    <Tag extends IrisElementTags>({ element }: UIElementRendererProps<Tag>) => {
      const { _tag, props, children, key } = element;
      const childrenArray = children?.map((child) => {
        if (isIrisElement(child)) {
          return <UIElementRenderer element={child} key={key} />;
        } else {
          return child;
        }
      }) as React.ReactNode[];
      if (_tag === 'root') {
        return <>{childrenArray}</>;
      }
      const Component = map[_tag as Exclude<IrisElementTags, 'root'>];
      if (!Component) {
        throw new Error(`No component found for tag ${_tag}`);
      }
      return <Component {...props}>{childrenArray}</Component>;
    }
  );

  return UIElementRenderer;
};
