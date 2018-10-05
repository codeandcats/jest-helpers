import * as fs from 'fs';
import * as path from 'path';
import resolveAppPath = require('resolve-app-path');

const appPath = resolveAppPath();

fs.copyFileSync(
  path.join(appPath, './package.json'),
  path.join(appPath, './dist/package.json')
);

fs.copyFileSync(
  path.join(appPath, './README.md'),
  path.join(appPath, './dist/README.md')
);

const packageJson = fs.readFileSync(path.join(appPath, './dist/package.json'), 'utf8');
const packageObject = JSON.parse(packageJson);

delete packageObject.private;
delete packageObject.scripts;
delete packageObject.devDependencies;
delete packageObject.husky;

fs.writeFileSync(
  path.join(appPath, './dist/package.json'),
  JSON.stringify(packageObject, null, '  '),
  'utf8'
);
