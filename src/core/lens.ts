type Lens<S, A> = {
  get: (s: S) => A;
  set: (a: A) => (s: S) => S;
};

export default {
  create: <S, A>(get: (s: S) => A, set: (a: A) => (s: S) => S): Lens<S, A> => ({
    get,
    set,
  }),
  compose: <S, A, B>(outer: Lens<S, A>, inner: Lens<A, B>): Lens<S, B> => ({
    get: (s: S) => inner.get(outer.get(s)),
    set: (b: B) => (s: S) => outer.set(inner.set(b)(outer.get(s)))(s),
  }),
  prop: <S, A>(prop: keyof S): Lens<S, A> => ({
    get: (s: S) => s[prop] as A,
    set: (a: A) => (s: S) => ({ ...s, [prop]: a }),
  }),
  index: <S extends Array<any>, A>(index: number): Lens<S, A> => ({
    get: (s: S) => s[index],
    set: (a: A) => (s: S) => {
      const copy = [...s];
      copy[index] = a;
      return copy as S;
    },
  }),
};
