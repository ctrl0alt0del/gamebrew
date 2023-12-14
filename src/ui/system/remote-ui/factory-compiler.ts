import type React from 'react';

import type { BaseIrisOp } from '@/types/general';

import type { IrisRemoteElement } from './iris-remote-tree';
const isJSXElementConstructor = (element: any): element is React.FC<any> => {
  return typeof element === 'function';
};

export type IrisTreeBuilderFactory<T> = (
  parent?: IrisRemoteElement<T> | null
) => (element: T) => IrisRemoteElement<T>;

type CompilerFactoryOptions<T> = {
  toIrisTree: IrisTreeBuilderFactory<T>;
};

export const factoryIrisCompiler = <T>({
  toIrisTree,
}: CompilerFactoryOptions<T>) => {
  const opQueue: BaseIrisOp[] = [];
  //ref is stack of IrisRemoteElement
  const elementsStackRef: {
    current: IrisRemoteElement[];
  } = { current: [] };
  //TODO: where is children processing ??
  const compile = (element: T) => {
    const treeBuilder = toIrisTree(elementsStackRef.current[0]);
    const node = treeBuilder(element);
    elementsStackRef.current.push(node);
    const result = node.fc(node.element.props);
    for (const item of result) {
      compile(item);
    }
    elementsStackRef.current.pop();
    return opQueue;
  };
  const useIrisCompile = (
    opFactory: (el: IrisRemoteElement) => BaseIrisOp[]
  ) => {
    opQueue.push(...opFactory(elementsStackRef.current[0]!));
  };
  return {
    compile,
    useIrisCompile,
  };
};
