/* eslint-disable no-new */
/* eslint-disable consistent-return */
import { Message } from 'discord.js';
import WatchClient from '../client';
import CommandContext from '../structures/CommandContext';
import Event from '../structures/event';

export default class MessageReceive extends Event {
  constructor(client: WatchClient) {
    super(client, 'message');
  }

  async run(message: Message): Promise<Message> {
    if (message.channel.type === 'dm') return;
    if (message.author?.bot) return;

    if (!message?.content.startsWith(process.env.PREFIX)) return;
    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const comando =
      this.client.commands.get(command) ||
      this.client.commands.get(this.client.aliases.get(command));
    if (!comando) return;

    const ctx = new CommandContext(this.client, message, args);

    if (comando.config.OnlyDevs) {
      if (process.env.OWNER_ID !== message.author.id)
        return ctx.reply('Este comando está disponível somente no servidor da Menhera!');
    }

    const userPermission = comando.config.UserPermission;
    const clientPermission = comando.config.ClientPermissions;
    if (userPermission !== null) {
      if (!message.member.permissions.has(userPermission)) {
        const perm = userPermission.map(value => `\`${value}\``).join(', ');
        return ctx.reply(
          `Você precisa das permissões: ${perm} pra executar isso, ${message.author}`
        );
      }
    }
    if (clientPermission !== null) {
      if (
        !message.guild.me.permissions.has(clientPermission) ||
        !message.channel.permissionsFor(this.client.user.id).has(clientPermission)
      ) {
        const perm = clientPermission.map(value => `\`${value}\``).join(', ');
        return ctx.reply(`O cliente precisa das permissões: ${perm} pra executar isso`);
      }
    }

    try {
      new Promise(res => res(comando.run(ctx)));
    } catch {
      // Do nothing
    }
  }
}
