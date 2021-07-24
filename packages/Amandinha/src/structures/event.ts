/* eslint-disable import/no-cycle */
// eslint-disable-next-line import/no-cycle
import WatchClient from '../client';

export default abstract class Event {
  public client!: WatchClient;

  public abstract run(...args: unknown[]): unknown;

  public dir!: string;

  public name!: string;

  constructor(client: WatchClient, name: string) {
    this.client = client;
    this.name = name;
  }
}
