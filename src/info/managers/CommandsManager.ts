import https from 'node:https';
import { ICommandData, ICommandDisabledData } from '../utils/types';

export default class CommandsManager {
  private static instance?: CommandsManager;

  private commands: Map<string, ICommandData>;

  private constructor() {
    this.commands = new Map();
  }

  public getAllCommands(): Array<ICommandData> {
    return Array.from(this.commands.values());
  }

  public getDisabledCommands(): Array<ICommandData> {
    return Array.from(this.commands.values()).filter(a => a.disabled);
  }

  private clearCommands(): void {
    this.commands.clear();
  }

  public postCommands(commands: ICommandData[]): void {
    this.clearCommands();
    commands.forEach(a => this.commands.set(a.name, a));
  }

  public editMaintenance(commandName: string, disabled: ICommandDisabledData): void {
    const existingData = this.commands.get(commandName);
    if (!existingData) return;
    existingData.disabled = disabled;
    this.commands.set(commandName, existingData);
  }

  static getInstance(): CommandsManager {
    if (!this.instance) {
      this.instance = new CommandsManager();

      https
        .request({
          host: 'api.menherabot.xyz',
          port: 443,
          path: '/main/commands',
          method: 'GET',
          headers: {
            authorization: process.env.API_TOKEN,
          },
        })
        .end();
    }

    return this.instance;
  }
}
