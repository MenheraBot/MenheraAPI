import CommandExecutes from './CommandsExecuted';
import { IShardStatus } from '../utils/types';

export default class ShardStatus {
  private static instance?: ShardStatus;

  private status: Map<number, IShardStatus>;

  private constructor() {
    this.status = new Map();
  }

  public getAllShards(): Array<
    IShardStatus & { executedCommands: number; top: { commandName: string; uses: number }[] }
  > {
    const ping = Array.from(this.status.values());
    const commands = CommandExecutes.getInstance().getExecutedCommands();

    return ping.map(a => {
      if (commands.findIndex(l => l.shardId === a.id) === -1)
        return { ...a, executedCommands: 0, top: [] };
      const top5shardCommands = commands
        .find(a[a.id])
        .commands.sort((c, d) => c.uses - d.uses)
        .slice(0, 4);
      return {
        ...a,
        executedCommands: commands[a.id].commands.reduce((e, f) => e + f.uses, 0),
        top: top5shardCommands,
      };
    });
  }

  public putShard(shardId: number, shardData: IShardStatus): void {
    this.status.set(shardId, shardData);
  }

  static getInstance(): ShardStatus {
    if (!this.instance) {
      this.instance = new ShardStatus();
    }

    return this.instance;
  }
}
