import { ICommands } from './interfaces';

class Variaveis {
    private commands: Array<ICommands> = [];

    getCommands() {
      return { length: this.commands.length, commands: this.commands };
    }

    setCommands(authorName: string, authorId: string, guildName: string,
      guildId: string, commandName: string, data: string): void {
      this.commands.push({
        authorName, authorId, guildName, guildId, commandName, data,
      });
    }

    clearCommands(): void {
      this.commands = [];
    }
}

const variaveis = new Variaveis();

export default variaveis;
