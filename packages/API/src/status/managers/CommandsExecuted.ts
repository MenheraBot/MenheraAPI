interface ShardsArray {
  shardId: number;
  commands: { commandName: string; uses: number }[];
}

export default class CommandExecutes {
  private static instance?: CommandExecutes;

  private shards: ShardsArray[];

  private constructor() {
    this.shards = [];
  }

  public getExecutedCommands(): ShardsArray[] {
    return this.shards;
  }

  public addCommand(shardId: number, commandName: string): void {
    const shardIndex = this.shards.findIndex(a => a.shardId === shardId);
    if (shardIndex === -1) this.shards.push({ shardId, commands: [] });
    const newShardIndex = shardIndex === -1 ? this.shards.length - 1 : shardIndex;
    const commandIndex = this.shards[newShardIndex].commands.findIndex(
      a => a.commandName === commandName
    );
    if (commandIndex === -1) this.shards[newShardIndex].commands.push({ commandName, uses: 1 });
    else this.shards[newShardIndex].commands[commandIndex].uses += 1;
  }

  public clearCommandsUsage(): void {
    this.shards = [];
  }

  static getInstance(): CommandExecutes {
    if (!this.instance) {
      this.instance = new CommandExecutes();
    }

    return this.instance;
  }
}
