type State<S, A> = (s: S) => [A, S];

export default {
  map:
    <S, A, B>(f: (a: A) => B, state: State<S, A>): State<S, B> =>
    (s: S) => {
      const [a, s2] = state(s);
      return [f(a), s2];
    },
  of:
    <S, A>(a: A): State<S, A> =>
    (s: S) =>
      [a, s],
  chain:
    <S, A, B>(f: (a: A) => State<S, B>, state: State<S, A>): State<S, B> =>
    (s: S) => {
      const [a, s2] = state(s);
      return f(a)(s2);
    },
  put:
    <S>(s: S): State<S, void> =>
    () =>
      [undefined, s],
  set:
    <S>(f: (s: S) => S): State<S, void> =>
    (s: S) =>
      [undefined, f(s)],
  get:
    <S, A>(f: (s: S) => A): State<S, A> =>
    (s: S) =>
      [f(s), s],
};
