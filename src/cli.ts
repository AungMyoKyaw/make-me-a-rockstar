#!/usr/bin/env node
import fs from 'fs';
import meow from 'meow';
import events from 'events';
import { ui } from './ui';
import { toDays, commitHistory, initRepo, commit } from './utilities';
import { codeGen, extGen, commitMessageGen, langs } from './data';

const pfs = fs.promises;
const myEmitter = new events();

const cli = meow(
  `
	Usage
	  $ rockstar <input>
  Options
    --polyglot
    --lang
    --day
    --month
    --year
    --email
    --name
	Examples
	  $ rockstar
	  $ rockstar --lang=javascript --day=1 --month=1 --year=1 --email=user@example.com --name='Mr Test'
`,
  {
    flags: {
      polyglot: {
        type: 'boolean'
      },
      lang: {
        default: 'javascript',
        type: 'string'
      },
      day: {
        default: 0,
        type: 'string'
      },
      month: {
        default: 0,
        type: 'string'
      },
      year: {
        default: 0,
        type: 'string'
      },
      email: {
        default: 'user@example.com',
        type: 'string'
      },
      name: {
        default: 'Mr. Test',
        type: 'string'
      }
    }
  }
);

const { email, name, lang, day, month, year, polyglot } = cli.flags;
const days = toDays(day, month, year);

//initialize UI
ui(myEmitter);

//start progress
myEmitter.emit('start');

const langLists = polyglot ? langs : [lang];

(async () => {
  try {
    await Promise.all(
      langLists.map(async lang => {
        const code = codeGen(lang);
        const dir = `./make-me-a-rockstar`;
        const file = `${dir}/${lang}.${extGen(lang)}`;
        const logs = commitHistory(days);
        await initRepo(dir);
        await pfs.appendFile(file, `${code}\n`);
        await Promise.all(
          logs.map(async date => {
            const message = commitMessageGen();
            await commit(dir, message, date, email, name);
            myEmitter.emit(
              'updateStatus',
              `Making you a rockstar ${lang} programmer`
            );
          })
        );
      })
    );
    myEmitter.emit('updateStatus', `You are now a rockstar programmer`);
    myEmitter.emit('stop');
  } catch (err) {
    myEmitter.emit('fail', err.message);
    process.exit(1);
  }
})();
