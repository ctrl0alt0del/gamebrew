/* eslint-disable */
import { IrisActionsKind } from '@/core/iris-actions-lib/iris-action-def';
import type { IrisDispatchOp } from '@/types/iris-action';
import { IrisKind, isIrisOp } from '@/types/iris-op-types';
import { compile, IrisText, IrisView } from '@/ui/system/remote-ui';

import { testLogObject } from './utils';

describe('factory-compiler', () => {
  it('should compile to array of IrisOp (no custom components)', () => {
    const template = (
      <IrisView>
        <IrisText text="Hello, World" />
      </IrisView>
    );
    const compiled = compile(template);
    expect(compiled).toBeInstanceOf(Array);
    expect(compiled).toHaveLength(2);
    const [view, text]: IrisDispatchOp[] = compiled;
    expect(isIrisOp(view)).toBeTruthy();
    expect(isIrisOp(text)).toBeTruthy();
    expect(view.kind).toBe(IrisKind.Dispatch);
    expect(view.actions).toHaveLength(1);
    expect(view.actions[0].kind).toBe(IrisKind.Action);
    expect(view.actions[0].args).toBeInstanceOf(Array);
    expect(view.actions[0].action).toBe(IrisActionsKind.PushIrisElement);
    expect(view.actions[0].args[0]._tag).toBe('IrisView');
    expect(text.kind).toBe(IrisKind.Dispatch);
    expect(text.actions).toHaveLength(1);
    expect(text.actions[0].kind).toBe(IrisKind.Action);
    expect(text.actions[0].args).toBeInstanceOf(Array);
    expect(text.actions[0].action).toBe(IrisActionsKind.PushIrisElement);
    expect(text.actions[0].args[0]._tag).toBe('IrisText');
  });
  it('should compile to array of IrisOp (2 children)', () => {
    const template = (
      <IrisView>
        <IrisText text="Hello, World" />
        <IrisText text="Hello, World" />
      </IrisView>
    );
    const compiled = compile(template);
    expect(compiled).toBeInstanceOf(Array);
    expect(compiled).toHaveLength(3);
    const [view, text1, text2]: IrisDispatchOp[] = compiled;
    expect(isIrisOp(view)).toBeTruthy();
    expect(isIrisOp(text1)).toBeTruthy();
    expect(isIrisOp(text2)).toBeTruthy();
    expect(view.kind).toBe(IrisKind.Dispatch);
    expect(view.actions).toHaveLength(1);
    expect(view.actions[0].kind).toBe(IrisKind.Action);
    expect(view.actions[0].args).toBeInstanceOf(Array);
    expect(view.actions[0].action).toBe(IrisActionsKind.PushIrisElement);
    expect(view.actions[0].args[0]._tag).toBe('IrisView');
    expect(text1.kind).toBe(IrisKind.Dispatch);
    expect(text1.actions).toHaveLength(1);
    expect(text1.actions[0].kind).toBe(IrisKind.Action);
    expect(text1.actions[0].args).toBeInstanceOf(Array);
    expect(text1.actions[0].action).toBe(IrisActionsKind.PushIrisElement);
    expect(text1.actions[0].args[0]._tag).toBe('IrisText');
    expect(text2.kind).toBe(IrisKind.Dispatch);
    expect(text2.actions).toHaveLength(1);
    expect(text2.actions[0].kind).toBe(IrisKind.Action);
    expect(text2.actions[0].args).toBeInstanceOf(Array);
    expect(text2.actions[0].action).toBe(IrisActionsKind.PushIrisElement);
    expect(text2.actions[0].args[0]._tag).toBe('IrisText');
  });
  it('should compile to array of IrisOp (with custom component)', () => {
    const Custom = ({ text }: { text: string }) => (
      <IrisView>
        <IrisText text={text} />
        <IrisText text={text} />
      </IrisView>
    );
    const template = (
      <IrisView>
        <Custom text="Hello, World" />
      </IrisView>
    );
    const compiled = compile(template);
    expect(compiled).toBeInstanceOf(Array);
    expect(compiled).toHaveLength(4);
    const [view, custom, text1, text2]: IrisDispatchOp[] = compiled;
    expect(isIrisOp(view)).toBeTruthy();
    expect(isIrisOp(custom)).toBeTruthy();
    expect(isIrisOp(text1)).toBeTruthy();
    expect(isIrisOp(text2)).toBeTruthy();
    expect(view.kind).toBe(IrisKind.Dispatch);
    expect(view.actions).toHaveLength(1);
    expect(view.actions[0].kind).toBe(IrisKind.Action);
    expect(view.actions[0].args).toBeInstanceOf(Array);
    expect(view.actions[0].action).toBe(IrisActionsKind.PushIrisElement);
    expect(view.actions[0].args[0]._tag).toBe('IrisView');
    expect(custom.kind).toBe(IrisKind.Dispatch);
    expect(custom.actions).toHaveLength(1);
    expect(custom.actions[0].kind).toBe(IrisKind.Action);
    expect(custom.actions[0].args).toBeInstanceOf(Array);
    expect(custom.actions[0].action).toBe(IrisActionsKind.PushIrisElement);
    expect(custom.actions[0].args[0]._tag).toBe('IrisView');
    expect(text1.kind).toBe(IrisKind.Dispatch);
    expect(text1.actions).toHaveLength(1);
    expect(text1.actions[0].kind).toBe(IrisKind.Action);
    expect(text1.actions[0].args).toBeInstanceOf(Array);
    expect(text1.actions[0].action).toBe(IrisActionsKind.PushIrisElement);
    expect(text1.actions[0].args[0]._tag).toBe('IrisText');
    expect(text2.kind).toBe(IrisKind.Dispatch);
    expect(text2.actions).toHaveLength(1);
    expect(text2.actions[0].kind).toBe(IrisKind.Action);
    expect(text2.actions[0].args).toBeInstanceOf(Array);
    expect(text2.actions[0].action).toBe(IrisActionsKind.PushIrisElement);
    expect(text2.actions[0].args[0]._tag).toBe('IrisText');
  });
});
