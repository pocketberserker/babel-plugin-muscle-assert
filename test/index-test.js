const assert = require('assert');
const fs = require('fs');
const path = require('path');
import plugin from '../src/';
import {transformFileSync} from 'babel-core';

// copy from https://github.com/azu/babel-plugin-auto-import-assert/blob/f1e360341ea3d0aabbae5aa623379a5a975be814/test/index-test.js

function trim(str) {
  return str.replace(/^\s+|\s+$/, '');
}

describe('babel-plugin-muscle-assert', () => {
  const fixturesDir = path.join(__dirname, 'fixtures');
  fs.readdirSync(fixturesDir).map((caseName) => {
    it(`should ${caseName.split('-').join(' ')}`, () => {
      const fixtureDir = path.join(fixturesDir, caseName);
      let actualPath = path.join(fixtureDir, 'actual.js');
      const actual = transformFileSync(actualPath).code;

      if (path.sep === '\\') {
        // Specific case of windows, transformFileSync return code with '/'
        actualPath = actualPath.replace(/\\/g, '/');
      }

      const expected = fs.readFileSync(
        path.join(fixtureDir, 'expected.js')
      ).toString().replace(/%FIXTURE_PATH%/g, actualPath);

      assert.equal(trim(actual), trim(expected));
    });
  });
});
