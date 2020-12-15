/* eslint-disable class-methods-use-this */
import { Message } from 'discord.js';
import WatchClient from '../../client';
import Command from '../../structures/command';

export default class SayCommand extends Command {
  constructor(client: WatchClient) {
    super(client, 'say', {
      ClientPermissions: ['MANAGE_MESSAGES'],
      category: 'diversão',
    });
  }

  async run(message: Message, args: Array<string>): Promise<Message> {
    message.delete({ timeout: 100 }).catch();
    return message.channel.send(args.join(' '));
  }
}
