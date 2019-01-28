import fixtures = require('./fixtures');
import { PortalGun } from './fixtures';
import {
  ClassDescriberContext, deepPartialOf,
  describeClass, describeField, describeFunction, describeMethod,
  fdescribeClass, fdescribeField, fdescribeFunction, fdescribeMethod,
  partialOf, xdescribeClass, xdescribeField, xdescribeFunction, xdescribeMethod
} from './index';

const originalDescribe = describe;
const originalFDescribe = fdescribe;
const originalXDescribe = xdescribe;

originalDescribe('src/index.ts', () => {
  let describeMock: jest.Mock<{}>;
  let xdescribeMock: jest.Mock<{}>;
  let fdescribeMock: jest.Mock<{}>;

  beforeEach(() => {
    describeMock = jest.fn().mockImplementation((_name, describer) => {
      describer();
    });
    describe = describeMock as any as jest.Describe;

    fdescribeMock = jest.fn().mockImplementation((_name, describer) => {
      describer();
    });
    fdescribe = fdescribeMock as any as jest.Describe;

    xdescribeMock = jest.fn().mockImplementation((_name, describer) => {
      describer();
    });
    xdescribe = xdescribeMock as any as jest.Describe;
  });

  afterEach(() => {
    xdescribe = originalXDescribe;
    fdescribe = originalFDescribe;
    describe = originalDescribe;
    jest.restoreAllMocks();
  });

  originalDescribe('describeClass', () => {
    it('should call describe with the name of the class', () => {
      const describer = jest.fn();

      describeClass(PortalGun, describer);
      expect(describe).toHaveBeenCalledTimes(1);
      expect(describe).toHaveBeenCalledWith('PortalGun', expect.any(Function));
    });

    it('should allow calling this.describeField within class describer', () => {
      const fieldDescriber = jest.fn();
      const describer = function(this: ClassDescriberContext<PortalGun>) {
        this.describeField('dimensionId', fieldDescriber);
      };

      describeClass(PortalGun, describer);
      expect(describe).toHaveBeenCalledTimes(2);
      expect(describe).toHaveBeenCalledWith('PortalGun', expect.any(Function));
      expect(describe).toHaveBeenCalledWith('dimensionId', fieldDescriber);
    });

    it('should allow calling this.describeMethod within class describer', () => {
      const methodDescriber = jest.fn();
      const describer = function(this: ClassDescriberContext<PortalGun>) {
        this.describeMethod('fire', methodDescriber);
      };

      describeClass(PortalGun, describer);
      expect(describe).toHaveBeenCalledTimes(2);
      expect(describe).toHaveBeenCalledWith('PortalGun', expect.any(Function));
      expect(describe).toHaveBeenCalledWith('fire', methodDescriber);
    });
  });

  originalDescribe('xdescribeClass', () => {
    it('should call xdescribe with the name of the class', () => {
      const describer = jest.fn();

      xdescribeClass(PortalGun, describer);
      expect(xdescribe).toHaveBeenCalledTimes(1);
      expect(xdescribe).toHaveBeenCalledWith('PortalGun', expect.any(Function));
    });
  });

  originalDescribe('fdescribeClass', () => {
    it('should call fdescribe with the name of the class', () => {
      const describer = jest.fn();

      fdescribeClass(PortalGun, describer);
      expect(fdescribe).toHaveBeenCalledTimes(1);
      expect(fdescribe).toHaveBeenCalledWith('PortalGun', expect.any(Function));
    });
  });

  originalDescribe('describeFunction', () => {
    it('should call describe with the name of the function', () => {
      const describer = jest.fn();

      describeFunction(fixtures, 'functionA', describer);
      expect(describeMock).toHaveBeenCalledTimes(1);
      expect(describeMock).toHaveBeenCalledWith('functionA', describer);

      describeFunction(fixtures, 'functionB', describer);
      expect(describeMock).toHaveBeenCalledTimes(2);
      expect(describeMock).toHaveBeenCalledWith('functionB', describer);
    });
  });

  originalDescribe('fdescribeFunction', () => {
    it('should call fdescribe with the name of the function', () => {
      const describer = jest.fn();

      fdescribeFunction(fixtures, 'functionA', describer);
      expect(fdescribe).toHaveBeenCalledTimes(1);
      expect(fdescribe).toHaveBeenCalledWith('functionA', describer);

      fdescribeFunction(fixtures, 'functionB', describer);
      expect(fdescribe).toHaveBeenCalledTimes(2);
      expect(fdescribe).toHaveBeenCalledWith('functionB', describer);
    });
  });

  originalDescribe('xdescribeFunction', () => {
    it('should call xdescribe with the name of the function', () => {
      const describer = jest.fn();

      xdescribeFunction(fixtures, 'functionA', describer);
      expect(xdescribe).toHaveBeenCalledTimes(1);
      expect(xdescribe).toHaveBeenCalledWith('functionA', describer);

      xdescribeFunction(fixtures, 'functionB', describer);
      expect(xdescribe).toHaveBeenCalledTimes(2);
      expect(xdescribe).toHaveBeenCalledWith('functionB', describer);
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
