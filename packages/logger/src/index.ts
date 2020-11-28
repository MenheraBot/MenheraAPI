import chalk from 'chalk';
import moment from 'moment';
import 'moment/locale/pt-br';

moment.locale('pt-br');

/* eslint-disable no-debugger, no-console */

export default class Logger {
  private static consoleLog(type: string, message: string): void {
    console.log(`${chalk.yellow(moment(Date.now()).format('L LTS'))} | ${type} ${message}`);
  }

  public static info(message: string): void {
    this.consoleLog(chalk.white('[INFO]'), message);
  }

  public static warn(message: string): void {
    this.consoleLog(chalk.yellow('[WARN]'), message);
  }

  public static error(message: string): void {
    this.consoleLog(chalk.red('[ERROR]'), message);
  }
}
