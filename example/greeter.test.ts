import { describeClass, describeMethod, describeModule } from '../src/index';
import { Greeter } from './greeter';

describeModule(() => {
  describeClass(Greeter, () => {
    describeMethod(Greeter, 'getGreeting', () => {
      it('should return a personalised greeting', () => {
        const greeter = new Greeter();
        expect(greeter.getGreeting('Joe')).toEqual('Hello Joe');
      });
    });
  });
});
