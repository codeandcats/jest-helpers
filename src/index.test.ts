import {
  describeClass, describeFunction, describeModule, fdescribeClass,
  fdescribeFunction, fdescribeModule, xdescribeClass,
  xdescribeFunction, xdescribeModule
} from './index';

const originalDescribe = describe;
const originalXDescribe = xdescribe;

originalDescribe('index.ts', () => {
  let describeMock: jest.Describe;
  let xdescribeMock: jest.Describe;
  let fdescribeMock: jest.Describe;

  beforeEach(() => {
    describeMock = jest.fn() as any;
    describe = describeMock;

    xdescribeMock = jest.fn() as any;
    xdescribe = xdescribeMock;

    fdescribeMock = jest.fn() as any;
    fdescribe = fdescribeMock;
  });

  afterEach(() => {
    fdescribe = originalXDescribe;
    xdescribe = originalXDescribe;
    describe = originalDescribe;
  });

  originalDescribe('describeModule', () => {
    it('should call describe with the filename of the file being tested', () => {
      const describer = jest.fn();
      describeModule(describer);
      expect(describeMock).toHaveBeenCalledTimes(1);
      expect(describeMock).toHaveBeenCalledWith(
        expect.stringMatching(/^.*\/src\/index.ts$/i),
        describer
      );
    });
  });

  originalDescribe('xdescribeModule', () => {
    it('should call xdescribe with the filename of the file being tested', () => {
      const describer = jest.fn();
      xdescribeModule(describer);
      expect(xdescribeMock).toHaveBeenCalledTimes(1);
      expect(xdescribeMock).toHaveBeenCalledWith(
        expect.stringMatching(/^.*\/src\/index.ts$/i),
        describer
      );
    });
  });

  originalDescribe('fdescribeModule', () => {
    it('should call fdescribe with the filename of the file being tested', () => {
      const describer = jest.fn();
      fdescribeModule(describer);
      expect(fdescribeMock).toHaveBeenCalledTimes(1);
      expect(fdescribeMock).toHaveBeenCalledWith(
        expect.stringMatching(/^.*\/src\/index.ts$/i),
        describer
      );
    });
  });

  class Foo {
    bar(): void {
      //
    }
  }

  originalDescribe('describeClass', () => {
    it('should call describe with the name of the class', () => {
      const describer = jest.fn();
      describeClass(Foo, describer);
      expect(describeMock).toHaveBeenCalledTimes(1);
      expect(describeMock).toHaveBeenCalledWith('Foo', describer);
    });
  });

  originalDescribe('xdescribeClass', () => {
    it('should call xdescribe with the name of the class', () => {
      const describer = jest.fn();
      xdescribeClass(Foo, describer);
      expect(xdescribeMock).toHaveBeenCalledTimes(1);
      expect(xdescribeMock).toHaveBeenCalledWith('Foo', describer);
    });
  });

  originalDescribe('fdescribeClass', () => {
    it('should call fdescribe with the name of the class', () => {
      const describer = jest.fn();
      fdescribeClass(Foo, describer);
      expect(fdescribeMock).toHaveBeenCalledTimes(1);
      expect(fdescribeMock).toHaveBeenCalledWith('Foo', describer);
    });
  });

  originalDescribe('describeFunction', () => {
    it('should call describe with the name of the function', () => {
      function theFunctionToTest() {
        //
      }
      const describer = jest.fn();
      describeFunction(theFunctionToTest, describer);
      expect(describeMock).toHaveBeenCalledTimes(1);
      expect(describeMock).toHaveBeenCalledWith('theFunctionToTest', describer);
    });

    it('should error if passed an anonymous function', () => {
      const describer = jest.fn();
      expect(() => describeFunction(() => {
        //
      }, describer)).toThrowError(new Error('Could not get name from anonymous function'));
    });
  });

  originalDescribe('fdescribeFunction', () => {
    it('should call fdescribe with the name of the function', () => {
      function theFunctionToTest() {
        //
      }
      const describer = jest.fn();
      fdescribeFunction(theFunctionToTest, describer);
      expect(fdescribeMock).toHaveBeenCalledTimes(1);
      expect(fdescribeMock).toHaveBeenCalledWith('theFunctionToTest', describer);
    });
  });

  originalDescribe('xdescribeFunction', () => {
    it('should call xdescribe with the name of the function', () => {
      function theFunctionToTest() {
        //
      }
      const describer = jest.fn();
      xdescribeFunction(theFunctionToTest, describer);
      expect(xdescribeMock).toHaveBeenCalledTimes(1);
      expect(xdescribeMock).toHaveBeenCalledWith('theFunctionToTest', describer);
    });
  });
});
