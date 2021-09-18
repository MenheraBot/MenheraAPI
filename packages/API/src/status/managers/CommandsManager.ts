import { IShardStatus } from '../utils/types';

export default class CommandsManager {
  private static instance?: CommandsManager;

  private status: Map<number, IShardStatus>;

  private constructor() {
    this.status = new Map();
  }

  public getAllShards(): Array<IShardStatus> {
    return Array.from(this.status.values());
  }

  public putShard(shardId: number, shardData: IShardStatus): void {
    this.status.set(shardId, shardData);
  }

  static getInstance(): CommandsManager {
    if (!this.instance) {
      this.instance = new CommandsManager();
    }

    return this.instance;
  }
}
