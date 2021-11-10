/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import WatchClient from '../client';
import Event from './event';

export default class EventManager {
  public client: WatchClient;

  constructor(client: WatchClient) {
    this.client = client;
  }

  add(event: Event): void {
    event.run = event.run.bind(event);
    this.client.on(event.name, event.run);
  }
}
