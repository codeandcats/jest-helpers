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

export function innerDescribeClass(
  describe: DescribeFunction,
  classToDescribe: Class<{}>,
  describer: () => void
) {
  describe(classToDescribe.name, describer);
}

export function describeClass(classToDescribe: Class<{}>, describer: () => void) {
  innerDescribeClass(describe, classToDescribe, describer);
}

export function fdescribeClass(classToDescribe: Class<{}>, describer: () => void) {
  innerDescribeClass(fdescribe, classToDescribe, describer);
}

export function xdescribeClass(classToDescribe: Class<{}>, describer: () => void) {
  innerDescribeClass(xdescribe, classToDescribe, describer);
}

export function innerDescribeFunction(
  describe: DescribeFunction,
  func: NamedFunction,
  describer: () => void
): void {
  if (!func.name) {
    throw new Error('Could not get name from anonymous function');
  }

  describe(func.name, describer);
}

export function describeFunction(func: NamedFunction, describer: () => void) {
  innerDescribeFunction(describe, func, describer);
}

export function fdescribeFunction(func: NamedFunction, describer: () => void) {
  innerDescribeFunction(fdescribe, func, describer);
}

export function xdescribeFunction(func: NamedFunction, describer: () => void) {
  innerDescribeFunction(xdescribe, func, describer);
}

type FunctionPropertyNames<T> = {
  // tslint:disable-next-line:ban-types
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T];

export function innerDescribeMethod<TInstance>(
  describe: DescribeFunction,
  methodName: FunctionPropertyNames<TInstance>,
  describer: () => void
) {
  describe(`${methodName}`, describer);
}

export function describeMethod<TInstance>(
  classToTest: Class<TInstance>,
  methodName: FunctionPropertyNames<TInstance>,
  describer: () => void
) {
  innerDescribeMethod(describe, methodName, describer);
}

export function fdescribeMethod<TInstance>(
  classToTest: Class<TInstance>,
  methodName: FunctionPropertyNames<TInstance>,
  describer: () => void
) {
  innerDescribeMethod(fdescribe, methodName, describer);
}

export function xdescribeMethod<TInstance>(
  classToTest: Class<TInstance>,
  methodName: FunctionPropertyNames<TInstance>,
  describer: () => void
) {
  innerDescribeMethod(xdescribe, methodName, describer);
}
