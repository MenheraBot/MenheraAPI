import { ICommands, IExistingCommands } from './interfaces';

class Variaveis {
  private commands: Array<ICommands> = [];

  private ExistingCommands: Array<IExistingCommands> = [];

  public postExistingCommands(command: IExistingCommands): void {
    this.ExistingCommands.push(command);
  }

  public async clearExistingCommands(): Promise<boolean> {
    this.ExistingCommands = [];
    return true;
  }

  public getExistingCommands(): Array<IExistingCommands> {
    return this.ExistingCommands;
  }

  public getCommands() {
    return { length: this.commands.length, commands: this.commands };
  }

  public setCommands(
    authorName: string,
    authorId: string,
    guildName: string,
    guildId: string,
    commandName: string,
    data: string,
    args: string
  ): void {
    this.commands.push({
      authorName,
      authorId,
      guildName,
      guildId,
      commandName,
      data,
      args,
    });
  }

  public clearCommands(): void {
    this.commands = [];
  }
}

const variaveis = new Variaveis();

export default variaveis;
