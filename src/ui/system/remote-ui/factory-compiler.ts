import type React from 'react';
import { v4 } from 'uuid';

import type { BaseIrisOp } from '@/types/general';
import type { IUIElement } from '@/types/ui-types';
const isJSXElementConstructor = (element: any): element is React.FC<any> => {
  return typeof element === 'function';
};

export const factoryIrisCompiler = () => {
  const opQueue: BaseIrisOp[] = [];
  const currentElementRef: {
    current: IUIElement | null;
  } = { current: null };
  const compile = (element: React.ReactElement) => {
    if (!isJSXElementConstructor(element.type)) {
      throw new Error('Element type is not a function');
    }
    const { children, ...props } = element.props;
    currentElementRef.current = {
      _tag: element.type.displayName || element.type.name,
      props: { ...props, key: element.key },
      children: children.map(compile),
      key: v4(),
    };
    currentElementRef.current.children = ;
  };
  const useIrisCompile = (opFactory: (el: IUIElement) => BaseIrisOp[]) => {
    opQueue.push(...opFactory(currentElementRef.current!));
  };
  return {
    compile,
    useIrisCompile,
  };
};
