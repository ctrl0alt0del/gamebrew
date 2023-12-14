type KeyMetaType = string | number | symbol;
export interface IUIElement<
  _Tag extends KeyMetaType = KeyMetaType,
  Props = any
> {
  readonly _tag: _Tag;
  key: string;
  props: Props;
  children?: (IUIElement | string)[];
}

export type UIElementStandard<PropsSet extends { [k: KeyMetaType]: unknown }> =
  {
    [key in keyof PropsSet]: IUIElement<key, PropsSet[key]>;
  }[keyof PropsSet];

type PropsOfUIElementStandard<
  T extends UIElementStandard<any>,
  _Tag extends string
> = T extends UIElementStandard<{
  [k in _Tag]: infer Props;
}>
  ? Props
  : never;

type IrisPropsSet = {
  root: {};
  text: {
    text: string;
  };
  pressable: {
    onPress: () => void;
  };
  view: {};
};
export type IrisElementTags = keyof IrisPropsSet;
export type IrisElement = UIElementStandard<IrisPropsSet>;
export type IrisElementInstance<Tag extends IrisElementTags> = IUIElement<
  Tag,
  IrisElementProps<Tag>
>;
export type IrisElementProps<Tag extends IrisElementTags> =
  PropsOfUIElementStandard<IrisElement, Tag>;

export type RootElement = IUIElement<'root', {}>;

const availableIrisTags = ['text', 'pressable', 'root'] as const;

export const isIrisElementTag = (tag: KeyMetaType): tag is IrisElementTags =>
  availableIrisTags.includes(tag as any);

export const isIrisElement = (element: IUIElement): element is IrisElement =>
  isIrisElementTag(element._tag);
