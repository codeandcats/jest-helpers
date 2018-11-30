import {
  ClassDescriberContext, deepPartialOf,
  describeClass, describeField, describeFunction, describeMethod,
  fdescribeClass, fdescribeField, fdescribeFunction, fdescribeMethod,
  partialOf, xdescribeClass, xdescribeField, xdescribeFunction, xdescribeMethod
} from './index';

const originalDescribe = describe;
const originalXDescribe = xdescribe;

originalDescribe('src/index.ts', () => {
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

  class PortalGun {
    /**
     * Id of the dimension to open a portal to
     */
    dimensionId: string = 'C-137';

    /**
     * Opens a portal to another dimension matching the id specified in dimensionId
     */
    fire(): void {
      // tslint:disable-next-line:no-console
      console.log(`Portal opened to ${this.dimensionId}`);
    }
  }

  originalDescribe('describeClass', () => {
    it('should call describe with the name of the class', () => {
      const describer = jest.fn();
      describeClass(PortalGun, describer);
      expect(describeMock).toHaveBeenCalledTimes(1);
      expect(describeMock).toHaveBeenCalledWith('PortalGun', expect.any(Function));
    });

    it('should allow calling this.describeField within class describer', () => {
      (describeMock as any as jest.Mock<{}>).mockImplementation((_name, classDescriber) => {
        classDescriber();
      });
      const fieldDescriber = jest.fn();
      const describer = function(this: ClassDescriberContext<PortalGun>) {
        this.describeField('dimensionId', fieldDescriber);
      };
      describeClass(PortalGun, describer);
      expect(describeMock).toHaveBeenCalledTimes(2);
      expect(describeMock).toHaveBeenCalledWith('PortalGun', expect.any(Function));
      expect(describeMock).toHaveBeenCalledWith('dimensionId', fieldDescriber);
    });

    it('should allow calling this.describeMethod within class describer', () => {
      (describeMock as any as jest.Mock<{}>).mockImplementation((_name, classDescriber) => {
        classDescriber();
      });
      const methodDescriber = jest.fn();
      const describer = function(this: ClassDescriberContext<PortalGun>) {
        this.describeMethod('fire', methodDescriber);
      };
      describeClass(PortalGun, describer);
      expect(describeMock).toHaveBeenCalledTimes(2);
      expect(describeMock).toHaveBeenCalledWith('PortalGun', expect.any(Function));
      expect(describeMock).toHaveBeenCalledWith('fire', methodDescriber);
    });
  });

  originalDescribe('xdescribeClass', () => {
    it('should call xdescribe with the name of the class', () => {
      const describer = jest.fn();
      xdescribeClass(PortalGun, describer);
      expect(xdescribeMock).toHaveBeenCalledTimes(1);
      expect(xdescribeMock).toHaveBeenCalledWith('PortalGun', expect.any(Function));
    });
  });

  originalDescribe('fdescribeClass', () => {
    it('should call fdescribe with the name of the class', () => {
      const describer = jest.fn();
      fdescribeClass(PortalGun, describer);
      expect(fdescribeMock).toHaveBeenCalledTimes(1);
      expect(fdescribeMock).toHaveBeenCalledWith('PortalGun', expect.any(Function));
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

  originalDescribe('describeField', () => {
    it('should call describe with the name of the field', () => {
      const portalGun = new PortalGun();
      const describer = jest.fn();
      describeField(portalGun, 'dimensionId', describer);
      expect(describe).toHaveBeenCalledTimes(1);
      expect(describe).toHaveBeenCalledWith('dimensionId', describer);
    });
  });

  originalDescribe('fdescribeField', () => {
    it('should call xdescribe with the name of the field', () => {
      const portalGun = new PortalGun();
      const describer = jest.fn();
      fdescribeField(portalGun, 'dimensionId', describer);
      expect(fdescribe).toHaveBeenCalledTimes(1);
      expect(fdescribe).toHaveBeenCalledWith('dimensionId', describer);
    });
  });

  originalDescribe('xdescribeField', () => {
    it('should call xdescribe with the name of the field', () => {
      const portalGun = new PortalGun();
      const describer = jest.fn();
      xdescribeField(portalGun, 'dimensionId', describer);
      expect(xdescribe).toHaveBeenCalledTimes(1);
      expect(xdescribe).toHaveBeenCalledWith('dimensionId', describer);
    });
  });

  originalDescribe('describeMethod', () => {
    it('should call describe with the name of the method', () => {
      const describer = jest.fn();
      describeMethod(PortalGun, 'fire', describer);
      expect(describe).toHaveBeenCalledTimes(1);
      expect(describe).toHaveBeenCalledWith('fire', describer);
    });
  });

  originalDescribe('fdescribeMethod', () => {
    it('should call fdescribe with the name of the method', () => {
      const describer = jest.fn();
      fdescribeMethod(PortalGun, 'fire', describer);
      expect(fdescribe).toHaveBeenCalledTimes(1);
      expect(fdescribe).toHaveBeenCalledWith('fire', describer);
    });
  });

  originalDescribe('xdescribeMethod', () => {
    it('should call xdescribe with the name of the method', () => {
      const describer = jest.fn();
      xdescribeMethod(PortalGun, 'fire', describer);
      expect(xdescribe).toHaveBeenCalledTimes(1);
      expect(xdescribe).toHaveBeenCalledWith('fire', describer);
    });
  });

  interface Client {
    name: string;
    address: {
      streetNumber: string;
      streetName: string;
      streetType: string;
      suburb: string;
      postcode: string;
      state: string;
      country: string;
    };
  }

  originalDescribe('partialOf', () => {
    it('should accept a partial and return it type-casted as not partial', () => {
      const client = partialOf<Client>({
        name: 'Homer Simpson'
      });
      expect(client).toEqual({
        name: 'Homer Simpson'
      });
    });
  });

  originalDescribe('deepPartialOf', () => {
    it('should accept a deep partial and return it type-casted as not partial', () => {
      const client = deepPartialOf<Client>({
        address: {
          suburb: 'Springfield'
        }
      });
      expect(client).toEqual({
        address: {
          suburb: 'Springfield'
        }
      });
    });
  });
});
