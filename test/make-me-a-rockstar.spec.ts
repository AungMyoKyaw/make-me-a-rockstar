import execa from 'execa';
import * as assert from 'assert';
import * as fs from 'fs';

import 'mocha';

const cliPath = `${process.env.PWD}/bin/src/cli.js`;

describe('MAKE-ME-A-ROCKSTAR', () => {
  it('SHOULD RETURN HELP', async () => {
    const { stdout } = await execa.shell(`node ${cliPath} --help`);
    assert.equal(stdout.includes('Examples'), true);
  });
  it('SHOULD MAKE YOU ROCKSTAR', async () => {
    const { stdout } = await execa.shell(
      `node ${cliPath} --lang='javascript' --day='1' --month='1' year='1'`
    );
    assert.equal(fs.existsSync('make-me-a-rockstar'), true);
  });
});
