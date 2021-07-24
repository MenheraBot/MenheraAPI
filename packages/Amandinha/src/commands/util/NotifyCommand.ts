import { Message } from 'discord.js';
import WatchClient from '../../client';
import Command from '../../structures/command';
import CommandContext from '../../structures/CommandContext';
import constants from '../../util/constants';

export default class NotifyCommand extends Command {
  constructor(client: WatchClient) {
    super(client, 'notify', {
      category: 'util',
    });
  }

  async run(ctx: CommandContext): Promise<Message> {
    if (ctx.message.guild.id !== constants.server)
      return ctx.reply('Comando disponível somente no servidor de suporte da Menhera');

    const wantStatus = ctx.args[0] === 'status';

    if (!wantStatus) {
      const role = this.client.guilds.cache
        .get(constants.server as `${bigint}`)
        .roles.cache.get(constants.roles.notify as `${bigint}`);

      if (ctx.message.member.roles.cache.has(role.id)) {
        ctx.message.member.roles.remove(role, 'Comando Notify');
        return ctx.reply(
          'Como desejar! Você não será mais notificado das atualizações da Menhera!'
        );
      }
      ctx.message.member.roles.add(role, 'Comando Notify');
      return ctx.reply('Feitoria! Você será notificado das atualizações da Menhera');
    }
    const role = this.client.guilds.cache
      .get(constants.server as `${bigint}`)
      .roles.cache.get(constants.roles.status as `${bigint}`);

    if (ctx.message.member.roles.cache.has(role.id)) {
      ctx.message.member.roles.remove(role, 'Comando Notify');
      return ctx.reply('Como desejar! Você não será mais notificado dos Status da Menhera');
    }
    ctx.message.member.roles.add(role, 'Comando Notify');
    return ctx.reply('Feitoria! Você será notificado dos Status da Menhera');
  }
}
