import { describeClass, describeField, describeFunction, describeMethod, partialOf } from '../src';
import * as greeterModule from './greeter';
import { Greeter, showGreeting } from './greeter';

describeClass(Greeter, () => {
  describeMethod(Greeter, 'getGreeting', () => {
    it('should return a personalised greeting', () => {
      const myGreeter = new Greeter();
      expect(myGreeter.getGreeting('Joe')).toEqual('Hello Joe');
    });
  });
});

describeField(greeterModule, 'defaultGreeter', () => {
  it('should be a Greeter', () => {
    expect(greeterModule.defaultGreeter).toBeInstanceOf(Greeter);
  });
});

describeFunction(showGreeting, () => {
  it('should log greeting to the console', () => {
    const greeterMock = partialOf<Greeter>({
      getGreeting: jest.fn().mockReturnValue('yo!')
    });

    jest.spyOn(console, 'log').mockImplementation(() => {
      //
    });

    showGreeting(greeterMock, 'Joe');

    expect(greeterMock.getGreeting).toHaveBeenCalledWith('Joe');
    // tslint:disable-next-line:no-console
    expect(console.log).toHaveBeenCalledWith('yo!');
  });
});
