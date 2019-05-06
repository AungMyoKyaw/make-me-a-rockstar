import fs from 'fs';
import * as git from 'isomorphic-git';
import { plugins } from 'isomorphic-git';

plugins.set('fs', fs);

const toDays = (
  day: number = 0,
  month: number = 0,
  year: number = 0
): number => {
  return day + month * 31 + year * 365;
};

const commitHistory = (days: number): Date[] => {
  let dates: Date[] = [];
  new Array(days).fill('').forEach((x, i) => {
    const timestamp = Date.now() - 24 * 60 * 60 * 1e3 * i;
    const commitCount = randomNumber(1, 10);
    const tempDates = new Array(commitCount)
      .fill('')
      .map(y => {
        const date = setRandomHour(timestamp);
        return date;
      })
      .sort((a, b) => {
        return b.getTime() - a.getTime();
      });
    dates.push(...tempDates);
  });
  dates.reverse();
  return dates;
};

const setRandomHour = (timestamp: number): Date => {
  let date = new Date(timestamp);
  const hour = randomNumber(0, 23);
  const min = randomNumber(0, 59);
  const sec = randomNumber(0, 59);
  const millisec = randomNumber(0, 999);
  date.setHours(hour, min, sec, millisec);
  return date;
};

const randomNumber = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
