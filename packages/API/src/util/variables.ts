import { ICommands } from './interfaces';

class Variaveis {
    private commands:Array<ICommands> = [];

    private logs = [];

    getCommands() {
      return { lenght: this.commands.length, commands: this.commands };
    }

    setCommands(authorName: string, authorId: string, guildName: string,
      guildId: string, commandName: string, data: string):void {
      this.commands.push({
        authorName, authorId, guildName, guildId, commandName, data,
      });
    }

    clearCommands():void {
      this.commands = [];
    }

    getLogs():Array<object> {
      return this.logs;
    }

    setLogs(log:object):void {
      this.logs.push(log);
    }
}

const variaveis = new Variaveis();

export default variaveis;
