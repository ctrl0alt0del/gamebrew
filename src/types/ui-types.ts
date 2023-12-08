export interface IUIElement<Keys extends string> {
  readonly _tag: string;
  attributes: {
    [key in Keys]: any;
  };
  children: IUIElement<any>[];
}
