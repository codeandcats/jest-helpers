import { describeClass, describeFunction, describeMethod, describeModule, partialOf } from '../src';
import { Greeter, showGreeting } from './greeter';

describeModule(() => {
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

      jest.spyOn(console, 'log').mockImplementation(() => {
        //
      });

      showGreeting(greeterMock, 'Joe');

      expect(greeterMock.getGreeting).toHaveBeenCalledWith('Joe');
      // tslint:disable-next-line:no-console
      expect(console.log).toHaveBeenCalledWith('yo!');
    });
  });
});
