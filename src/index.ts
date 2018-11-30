
type DescribeFunction = (subject: string, cb: () => void) => void;

export interface Class<TInstance extends {}> {
  name: string;
  new(...args: any[]): TInstance;
}

export interface NamedFunction {
  name: string;
  (...args: any[]): any;
}

export interface ClassDescriberContext<TInstance> {
  describeField(
    fieldName: NonFunctionPropertyNames<TInstance>,
    fieldDescriber: () => void
  ): void;

  describeMethod(
    methodName: FunctionPropertyNames<TInstance>,
    describer: () => void
  ): void;
}

/**
 * Calls describe with the name of your function.
 * @param func The function that you want to describe
 * @param describer Description function
 */
export function describeFunction(func: NamedFunction, describer: () => void) {
  innerDescribeFunction(describe, func, describer);
}

/**
 * Calls fdescribe with the name of your function.
 * @param func The function that you want to describe
 * @param describer Description function
 */
export function fdescribeFunction(func: NamedFunction, describer: () => void) {
  innerDescribeFunction(fdescribe, func, describer);
}

/**
 * Calls xdescribe with the name of your function.
 * @param func The function that you want to describe
 * @param describer Description function
 */
export function xdescribeFunction(func: NamedFunction, describer: () => void) {
  innerDescribeFunction(xdescribe, func, describer);
}

function innerDescribeClass<TInstance>(
  describeFunc: DescribeFunction,
  classToDescribe: Class<TInstance>,
  describer: (this: ClassDescriberContext<TInstance>) => void
) {
  const describerContext: ClassDescriberContext<TInstance> = {
    describeField: (fieldName: NonFunctionPropertyNames<TInstance>, fieldDescriber: () => void) => {
      innerDescribeField(describe, fieldName, fieldDescriber);
    },
    describeMethod: (methodName: FunctionPropertyNames<TInstance>, methodDescriber: () => void) => {
      innerDescribeMethod(describe, methodName, methodDescriber);
    }
  };
  describeFunc(classToDescribe.name, describer.bind(describerContext));
}

/**
 * Calls describe with the name of your class.
 * @param classToDescribe Class to describe
 * @param describer Description function
 */
export function describeClass<TInstance extends {}>(
  classToDescribe: Class<TInstance>,
  describer: (this: ClassDescriberContext<TInstance>) => void
) {
  innerDescribeClass(describe, classToDescribe, describer);
}

/**
 * Calls fdescribe with the name of your class.
 * @param classToDescribe Class to describe
 * @param describer Description function
 */
export function fdescribeClass<TInstance extends {}>(
  classToDescribe: Class<TInstance>,
  describer: (this: ClassDescriberContext<TInstance>) => void
) {
  innerDescribeClass(fdescribe, classToDescribe, describer);
}

/**
 * Calls xdescribe with the name of your class.
 * @param classToDescribe Class to describe
 * @param describer Description function
 */
export function xdescribeClass<TInstance extends {}>(
  classToDescribe: Class<TInstance>,
  describer: (this: ClassDescriberContext<TInstance>) => void
) {
  innerDescribeClass(xdescribe, classToDescribe, describer);
}

function innerDescribeFunction(
  describe: DescribeFunction,
  func: NamedFunction,
  describer: () => void
): void {
  if (!func.name) {
    throw new Error('Could not get name from anonymous function');
  }

  describe(func.name, describer);
}

type NonFunctionPropertyNames<T> = {
  // tslint:disable-next-line:ban-types
  [K in keyof T]: T[K] extends Function ? never : K
}[keyof T];

export function innerDescribeField<TObject>(
  describe: DescribeFunction,
  fieldName: NonFunctionPropertyNames<TObject>,
  describer: () => void
) {
  describe(`${fieldName}`, describer);
}

/**
 * Calls describe with the name of your field
 * @param object The object to describe
 * @param fieldName The field to describe
 * @param describer Description function
 */
export function describeField<TObject extends {}>(
  object: TObject,
  fieldName: NonFunctionPropertyNames<TObject>,
  describer: () => void
) {
  innerDescribeField(describe, fieldName, describer);
}

/**
 * Calls fdescribe with the name of your field
 * @param object The object to describe
 * @param fieldName The field to describe
 * @param describer Description function
 */
export function fdescribeField<TObject extends {}>(
  object: TObject,
  fieldName: NonFunctionPropertyNames<TObject>,
  describer: () => void
) {
  innerDescribeField(fdescribe, fieldName, describer);
}

/**
 * Calls xdescribe with the name of your field
 * @param object The object to describe
 * @param fieldName The field to describe
 * @param describer Description function
 */
export function xdescribeField<TObject extends {}>(
  object: TObject,
  fieldName: NonFunctionPropertyNames<TObject>,
  describer: () => void
) {
  innerDescribeField(xdescribe, fieldName, describer);
}

type FunctionPropertyNames<T> = {
  // tslint:disable-next-line:ban-types
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T];

function innerDescribeMethod<TInstance>(
  describe: DescribeFunction,
  methodName: FunctionPropertyNames<TInstance>,
  describer: () => void
) {
  describe(`${methodName}`, describer);
}

/**
 * Calls describe with the name of your method
 * @param classToTest The class to describe
 * @param methodName The method to describe
 * @param describer Description function
 */
export function describeMethod<TInstance>(
  classToTest: Class<TInstance>,
  methodName: FunctionPropertyNames<TInstance>,
  describer: () => void
) {
  innerDescribeMethod(describe, methodName, describer);
}

/**
 * Calls fdescribe with the name of your method
 * @param classToTest The class to describe
 * @param methodName The method to describe
 * @param describer Description function
 */
export function fdescribeMethod<TInstance>(
  classToTest: Class<TInstance>,
  methodName: FunctionPropertyNames<TInstance>,
  describer: () => void
) {
  innerDescribeMethod(fdescribe, methodName, describer);
}

/**
 * Calls xdescribe with the name of your method
 * @param classToTest The class to describe
 * @param methodName The method to describe
 * @param describer Description function
 */
export function xdescribeMethod<TInstance>(
  classToTest: Class<TInstance>,
  methodName: FunctionPropertyNames<TInstance>,
  describer: () => void
) {
  innerDescribeMethod(xdescribe, methodName, describer);
}

/**
 * Takes a partial object and type-casts it to the full object.
 * e.g. partial<Console>({ log: jest.fn() }) // Typecasts to Console with all methods, not just log
 * @param partial The partial object.
 */
export function partialOf<TObjectToMock>(partial: Partial<TObjectToMock>): TObjectToMock {
  return partial as TObjectToMock;
}

/**
 * Takes a deep-partial object and type-casts it to the full object.
 * Works just like partialOf<T> but it's partial all the way down!
 * @param partial
 */
export function deepPartialOf<TObjectToMock>(partial: DeepPartial<TObjectToMock>): TObjectToMock {
  return partial as TObjectToMock;
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T[P] extends ReadonlyArray<infer U2>
  ? ReadonlyArray<DeepPartial<U2>>
  : DeepPartial<T[P]>
};
