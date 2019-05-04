import Ora from 'ora';

let spinner: any;

const ui = (myEmitter: any) => {
  myEmitter.on('start', () => {
    spinner = Ora({
      text: 'Making you a rockstar programmer',
      spinner: 'weather'
    }).start();
  });

  myEmitter.on('updateStatus', (text: string) => {
    spinner.text = text;
  });

  myEmitter.on('stop', () => {
    spinner.succeed();
  });

  myEmitter.on('fail', (text: string) => {
    spinner.fail(text);
  });
};

export { ui };
