import { isIrisOp } from '@/types/iris-op-types';
import { compile, IrisText, IrisView } from '@/ui/system/remote-ui';

describe('factory-compiler', () => {
  it('should compile to array of IrisOp', () => {
    const compiled = compile(
      <IrisView>
        <IrisText text="Hello, World" />
      </IrisView>
    );
    expect(compiled).toBeInstanceOf(Array);
    expect(compiled).toHaveLength(2);
    const [view, text] = compiled;
    expect(isIrisOp(view)).toBeTruthy();
    expect(isIrisOp(text)).toBeTruthy();
  });
});
