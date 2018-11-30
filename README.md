# jest-helpers

<br />
<p align="center">
  <img src="logo.png" height="100">
  <p align="center">TypeScript helper functions for Jest to help make your tests resilient to refactoring.</p>
</p>
<br />

[![npm version](https://badge.fury.io/js/jest-helpers.svg)](https://badge.fury.io/js/jest-helpers)
[![Build Status](https://travis-ci.org/codeandcats/jest-helpers.svg?branch=master)](https://travis-ci.org/codeandcats/jest-helpers)
[![Coverage Status](https://coveralls.io/repos/github/codeandcats/jest-helpers/badge.svg?branch=master)](https://coveralls.io/github/codeandcats/jest-helpers?branch=master)


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
import { Greeter, showGreeting } from './greeter';

describeClass(Greeter, () => {
  describeMethod(Greeter, 'getGreeting', () => {
    it('should return a personalised greeting', () => {
      const greeter = new Greeter();
      expect(greeter.getGreeting('Joe')).toEqual('Hello Joe');
    });
  });
});

describeFunction(showGreeting, () => {
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

## Benefits
- ✅ If you rename your `Greeter` class, it will automatically update the test description

- ✅ If you rename your `Greeter.getGreeting` method, you will get a TypeScript error in your test until you update `getGreeting` to match the new name

- ✅ If you rename your `showGreeting` method, it will automatically update the test description

## Contributing
Got an issue or a feature request? [Log it](https://github.com/codeandcats/jest-helpers/issues).

[Pull-requests](https://github.com/codeandcats/jest-helpers/pulls) are also welcome. 😸
