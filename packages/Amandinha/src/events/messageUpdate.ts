import { Message } from 'discord.js';
import WatchClient from '../client';
import Event from '../structures/event';

export default class MessageUpdate extends Event {
  constructor(client: WatchClient) {
    super(client, 'messageUpdate');
  }

  run(oldMessage: Message, newMessage: Message): void {
    if (oldMessage.content === newMessage.content) return;
    this.client.emit('messageCreate', newMessage);
  }
}
