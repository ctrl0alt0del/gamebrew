export default {
  compose:
    <A, B, C>(f: (b: B) => C, g: (a: A) => B) =>
    (a: A) =>
      f(g(a)),
  curry:
    <A, B, C>(f: (a: A, b: B) => C) =>
    (a: A) =>
    (b: B) =>
      f(a, b),
  flip:
    <A, B, C>(f: (a: A, b: B) => C) =>
    (b: B, a: A) =>
      f(a, b),
  identity: <A>(a: A) => a,
  pipe:
    <A, B, C>(f: (a: A) => B, g: (b: B) => C) =>
    (a: A) =>
      g(f(a)),
};
