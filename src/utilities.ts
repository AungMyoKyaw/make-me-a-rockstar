import fs from 'fs';
import * as git from 'isomorphic-git';
import { plugins } from 'isomorphic-git';

const pfs = fs.promises;
plugins.set('fs', fs);

const toDays = (
  day: number = 0,
  month: number = 0,
  year: number = 0
): number => {
  return day + month * 31 + year * 365;
};

const commitHistory = (days: number): Date[] => {
  const dates: Date[] = new Array(days)
    .fill('')
    .map((x, i) => {
      const timestamp = Date.now() - 24 * 60 * 60 * 1e3 * i;
      const date = new Date(timestamp);
      return date;
    })
    .reverse();
  return dates;
};

const initRepo = async (dir: string): Promise<void> => {
  const exist = fs.existsSync(dir);
  if (!exist) {
    fs.mkdirSync(dir);
  }
  await git.init({ dir });
};

const commit = async (
  dir: string,
  message: string,
  date: Date,
  email: string,
  name: string
): Promise<void> => {
  await git.add({ dir, filepath: '.' });
  await git.commit({
    dir,
    author: {
      name,
      email,
      date
    },
    message
  });
};

export { toDays, commitHistory, initRepo, commit };
