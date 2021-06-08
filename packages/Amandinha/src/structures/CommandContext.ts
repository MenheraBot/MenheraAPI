/* eslint-disable import/no-cycle */
import { Message, MessageEmbed, MessageOptions } from 'discord.js';
import WatchClient from '../client';

export default class CommandContext {
  public client: WatchClient;

  public message: Message;

  public args: Array<string>;

  constructor(client: WatchClient, message: Message, args: Array<string>) {
    this.client = client;
    this.message = message;
    this.args = args;
  }

  async sendEmbed(embed: MessageEmbed, reply?: boolean): Promise<Message> {
    if (reply)
      return this.message.channel.send({
        embed,
        reply: { messageReference: this.message },
      });
    return this.message.channel.send(embed);
  }

  async sendR(msg: MessageOptions): Promise<Message | Message[]> {
    return this.message.channel.send(msg);
  }

  async sendC(content: string, options: MessageOptions): Promise<Message | Message[]> {
    return this.message.channel.send(content, options);
  }

  async reply(text: string): Promise<Message> {
    return this.message.channel.send(text, {
      reply: {
        messageReference: this.message,
      },
    });
  }
}
