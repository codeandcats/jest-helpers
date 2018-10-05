import * as getStack from 'callsite';
import resolveAppPath = require('resolve-app-path');
import { getSubjectFileName } from './utils';

type DescribeFunction = (subject: string, cb: () => void) => void;

function innerDescribeModule(describe: DescribeFunction, describer: () => void) {
  const stack = getStack();
  const testFileName = stack[2].getFileName();
  const relativeTestFileName = testFileName.substr(resolveAppPath().length + 1);
  const subjectFileName = getSubjectFileName(relativeTestFileName);
  describe(subjectFileName, describer);
}

export function describeModule(describer: () => void) {
  innerDescribeModule(describe, describer);
}

export function fdescribeModule(describer: () => void) {
  innerDescribeModule(fdescribe, describer);
}

export function xdescribeModule(describer: () => void) {
  innerDescribeModule(xdescribe, describer);
}

export interface Class<TInstance extends {}> {
  name: string;
  new(...args: any[]): TInstance;
}

export interface NamedFunction {
  name: string;
  (...args: any[]): any;
}

function innerDescribeClass(
  describe: DescribeFunction,
  classToDescribe: Class<{}>,
  describer: () => void
) {
  describe(classToDescribe.name, describer);
}

/**
 * Calls describe with the name of your class.
 * @param classToDescribe Class to describe
 * @param describer Description function
 */
export function describeClass(classToDescribe: Class<{}>, describer: () => void) {
  innerDescribeClass(describe, classToDescribe, describer);
}

/**
 * Calls fdescribe with the name of your class.
 * @param classToDescribe Class to describe
 * @param describer Description function
 */
export function fdescribeClass(classToDescribe: Class<{}>, describer: () => void) {
  innerDescribeClass(fdescribe, classToDescribe, describer);
}

/**
 * Calls xdescribe with the name of your class.
 * @param classToDescribe Class to describe
 * @param describer Description function
 */
export function xdescribeClass(classToDescribe: Class<{}>, describer: () => void) {
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
