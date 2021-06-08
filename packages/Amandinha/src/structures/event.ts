/* eslint-disable import/no-cycle */
// eslint-disable-next-line import/no-cycle
import { ClientEvents } from 'discord.js';
import WatchClient from '../client';

export default abstract class Event {
  public client!: WatchClient;

  public abstract run(...args: unknown[]): unknown;

  public dir!: string;

  public name!: ClientEvents;

  constructor(client: WatchClient, name: ClientEvents) {
    this.client = client;
    this.name = name;
  }
}
