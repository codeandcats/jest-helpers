# jest-helpers

<br />
<p align="center">
  <img src="logo.png" height="100">
  <p align="center">Tests should be living documentation for your code, but often test descriptions get out of sync with your code. This library helps keep them in sync using TypeScript.</p>
</p>
<br />

[![npm version](https://badge.fury.io/js/jest-helpers.svg)](https://badge.fury.io/js/jest-helpers)
[![Build Status](https://travis-ci.org/codeandcats/jest-helpers.svg?branch=master)](https://travis-ci.org/codeandcats/jest-helpers)
[![Coverage Status](https://coveralls.io/repos/github/codeandcats/jest-helpers/badge.svg?branch=master)](https://coveralls.io/github/codeandcats/jest-helpers?branch=master)


## Benefits
- When you rename a class, the name of your test for it will automatically update
- When you rename any of the following, your test will get a TypeScript error until you update your test:
  - A method on a class
  - A field on a class
  - An exported function inside a module
- Has useful functions for creating mocks:
  - `partialOf<T>(partial: Partial<T>): T`
  - `deepPartialOf<T>(partial: DeepPartial<T>): T`


## Install
```sh
npm install jest-helpers --save-dev
```

## Usage
`./greeter.ts`
```typescript
export class Greeter {
  getGreeting(name: string) {
    return `Hello ${name}`;
  }
}

export function showGreeting(greeter: Greeter, name: string) {
  const greeting = greeter.getGreeting(name)
  console.log(greeting)
}
```

`./greeter.test.ts`
```typescript
import { describeClass, describeFunction, describeMethod, partialOf } from 'jest-helpers';
import greeterModule = require('greeter');
import { Greeter, showGreeting } from './greeter';

describeClass(Greeter, () => {
  describeMethod(Greeter, 'getGreeting', () => {
    it('should return a personalised greeting', () => {
      const greeter = new Greeter();
      expect(greeter.getGreeting('Joe')).toEqual('Hello Joe');
    });
  });
});

describeFunction(greeterModule, 'showGreeting', () => {
  it('should log greeting to the console', () => {
    const greeterMock = partialOf<Greeter>({
      getGreeting: jest.fn().mockReturnValue('yo!')
    });

    jest.spyOn(console, 'log');

    showGreeting(greeterMock, 'Joe');

    expect(greeterMock.getGreeting).toHaveBeenCalledWith('Joe');
    expect(console.log).toHaveBeenCalledWith('yo!');
  });
});
```

Running `jest --verbose` will output something like
```
  example/greeter.ts
    Greeter
      getGreeting
        ✓ should return a personalised greeting (4ms)
    showGreeting
      ✓ should log greeting to the console (2ms)
```

If you rename your `Greeter` class, it will automatically update the test description.

If you rename your `Greeter.getGreeting` method, you will get a TypeScript error in your test until you update your test to match the new name.

If you rename your `showGreeting` function, you will get a TypeScript error in your test until you update your test to match the new name.


## Contributing
Got an issue or a feature request? [Log it](https://github.com/codeandcats/jest-helpers/issues).

[Pull-requests](https://github.com/codeandcats/jest-helpers/pulls) are also welcome. 😸
