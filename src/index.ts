import * as getStack from 'callsite';
import { getSubjectFileName } from './utils';

function innerDescribeModule(describe: (subject: string, cb: () => void) => void, describer: () => void) {
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
