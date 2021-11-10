import { Message } from 'discord.js';
import WatchClient from '../../client';
import Command from '../../structures/command';
import CommandContext from '../../structures/CommandContext';
import constants from '../../util/constants';

export default class NotifyCommand extends Command {
  constructor(client: WatchClient) {
    super(client, 'beta', {
      category: 'util',
    });
  }

  async run(ctx: CommandContext): Promise<Message> {
    if (ctx.message.guild?.id !== constants.server)
      return ctx.reply('Comando disponível somente no servidor de suporte da Menhera');

    const role = this.client.guilds.cache
      .get(constants.server)
      ?.roles.cache.get(constants.roles.beta);

    if (ctx.message.member?.roles.cache.has(role?.id ?? '0')) {
      ctx.message.member.roles.remove(role || 'a', 'Comando Beta');
      return ctx.reply('Perfeitamente, você perdeu o acesso às atualizações da Beta');
    }
    ctx.message.member?.roles.add(role ?? 'a', 'Comando Beta');
    return ctx.reply(
      'DAliiii. Você agora será notificado das atualizações da beta. Tudo isso acontece no <#852197292589187094>'
    );
  }
}
