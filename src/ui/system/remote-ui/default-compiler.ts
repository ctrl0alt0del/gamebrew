import { factoryIrisCompiler } from './factory-compiler';
import { reactToIrisTree } from './iris-remote-tree';

export const { compile, useIrisCompile } = factoryIrisCompiler({
  toIrisTree: reactToIrisTree,
});
