import * as getStack from 'callsite';
import { getSubjectFileName } from './utils';

type DescribeFunction = (subject: string, cb: () => void) => void;

function innerDescribeModule(describe: DescribeFunction, describer: () => void) {
  const stack = getStack();
  const testFileName = stack[2].getFileName();
  const subjectFileName = getSubjectFileName(testFileName);
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

interface Class {
  name: string;
  new(...args: any[]): {};
}

export function innerDescribeClass(
  describe: DescribeFunction,
  classToDescribe: Class,
  describer: () => void
) {
  describe(classToDescribe.name, describer);
}

export function describeClass(classToDescribe: Class, describer: () => void) {
  innerDescribeClass(describe, classToDescribe, describer);
}

export function fdescribeClass(classToDescribe: Class, describer: () => void) {
  innerDescribeClass(fdescribe, classToDescribe, describer);
}

export function xdescribeClass(classToDescribe: Class, describer: () => void) {
  innerDescribeClass(xdescribe, classToDescribe, describer);
}
