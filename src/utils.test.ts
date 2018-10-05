import { getSubjectFileName } from './utils';

describe('utils.ts', () => {
  describe('getSubjectFileName', () => {
    it('should guess the subject filename for a test', () => {
      expect(getSubjectFileName('/src/foo.test.ts')).toEqual('/src/foo.ts');
      expect(getSubjectFileName('/src/foo.spec.js')).toEqual('/src/foo.js');
    });
  });
});
