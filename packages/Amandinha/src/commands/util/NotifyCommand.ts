import { Message } from 'discord.js';
import WatchClient from '../../client';
import Command from '../../structures/command';
import constants from '../../util/constants';

export default class NotifyCommand extends Command {
  constructor(client: WatchClient) {
    super(client, 'notify', {
      category: 'util',
    });
  }

  async run(message: Message): Promise<Message> {
    if (message.guild.id !== constants.server)
      return message.channel.send('Comando disponível somente no servidor de suporte da Menhera');

    const role = this.client.guilds.cache
      .get(constants.server)
      .roles.cache.get(constants.roles.notify);

    if (message.member.roles.cache.has(role.id)) {
      message.member.roles.remove(role, 'Comando Notify');
      return message.channel.send(
        'Como desejar! Você não será mais notificado das atualizações da Menhera!'
      );
    }
    message.member.roles.add(role, 'Comando Notify');
    return message.channel.send('Feitoria! Você será notificado das atualizações da Menhera');
  }
}
