import rawCode from './code.json';
import rawCommitMessage from './commitMessage.json';

interface Idata {
  lang: {
    [index: string]: {
      [index: string]: string;
    };
  };
  messages: string[];
}

const data: Idata = {
  lang: rawCode,
  messages: rawCommitMessage.messages
};

const messageLength = data.messages.length;

const codeGen = (lang: string): string => {
  const defaultCode: string = data.lang['javascript'].code;
  const code: string = data.lang[lang].code || defaultCode;
  return code;
};

const extGen = (lang: string): string => {
  const ext: string = data.lang[lang].ext || 'txt';
  return ext;
};

const commitMessageGen = (): string => {
  const message: string =
    data.messages[Math.floor(Math.random() * messageLength)];
  return message;
};

const langs: string[] = Object.keys(rawCode);

export { codeGen, extGen, commitMessageGen, langs };
