import * as path from 'path';

export function getSubjectFileName(testFileName: string) {
  const directoryPath = path.dirname(testFileName);
  const baseName = path.basename(testFileName);
  let newBaseName = baseName.replace('.test.', '.');
  if (newBaseName === baseName) {
    newBaseName = baseName.replace('.spec.', '.');
  }
  const subjectFileName = path.join(directoryPath, newBaseName);
  return subjectFileName;
}
