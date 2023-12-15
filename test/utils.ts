export const testLogObject = <T>(t: T) =>
  console.log(
    require('util').inspect(t, false, null, true /* enable colors */) + '\n'
  );
