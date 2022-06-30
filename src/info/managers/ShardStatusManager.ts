import { IShardStatus } from '../utils/types';

export default class ShardStatus {
  private static instance?: ShardStatus;

  private status: Map<number, IShardStatus>;

  private constructor() {
    this.status = new Map();
  }

  public getAllShards(): Array<IShardStatus> {
    return Array.from(this.status.values());
  }

  public updateShards(shardData: IShardStatus[]): void {
    shardData.forEach((shard) => {
      this.status.set(Number(shard.id), {...shard, id: Number(shard.id)})
    })
  }

  static getInstance(): ShardStatus {
    if (!this.instance) {
      this.instance = new ShardStatus();
    }

    return this.instance;
  }
}
