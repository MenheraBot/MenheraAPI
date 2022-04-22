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
        embeds: [embed],
        reply: { messageReference: this.message },
      });
    return this.message.channel.send({ embeds: [embed] });
  }

  async sendR(msg: MessageOptions): Promise<Message | Message[]> {
    return this.message.channel.send(msg);
  }

  async reply(text: string): Promise<Message> {
    return this.message.channel.send({
      content: text,
      reply: {
        messageReference: this.message,
      },
    });
  }
}
