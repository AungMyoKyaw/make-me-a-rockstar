import Ora from 'ora';

let spinner: any;

const ui = (myEmitter: any) => {
  myEmitter.on('start', () => {
    spinner = Ora({
      text: 'Making you a rockstar programmer',
      spinner: 'dots'
    }).start();
  });

  myEmitter.on('updateStatus', (text: string) => {
    spinner.text = text;
  });

  myEmitter.on('stop', (text: string) => {
    spinner.succeed();
  });
};

export { ui };
