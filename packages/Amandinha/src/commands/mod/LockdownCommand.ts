/* eslint-disable class-methods-use-this */
import { Message, MessageReaction } from 'discord.js';
import WatchClient from '../../client';
import Command from '../../structures/command';
import constants from '../../util/constants';

export default class LockdownCommand extends Command {
  constructor(client: WatchClient) {
    super(client, 'lockdown', {
      category: 'Moderação',
      ClientPermissions: ['MANAGE_CHANNELS', 'MANAGE_ROLES'],
      UserPermission: ['ADMINISTRATOR'],
      OnlyDevs: true,
    });
  }

  async run(message: Message, args: Array<string>): Promise<MessageReaction | Message> {
    if (!args[0]) return message.channel.send('Escolha entre `on` e `off`');

    let owo = null;

    if (args[0] === 'on') owo = false;

    message.guild.channels.cache.forEach(ch => {
      if (!constants.ignoredChannelsToLockDown.includes(ch.id)) {
        ch.updateOverwrite(message.guild.roles.everyone, {
          SEND_MESSAGES: owo,
        })
          .then(g => {
            if (g.type === 'text' && g.isText()) {
              g.send(
                owo === false
                  ? '🔒 **LOCKDOWN** 🔒 \nEste canal foi bloqueado pelo sistema de segurança feito pela GOSTOSA DA LUX UI UI UI'
                  : 'O canal está liberado para conversas'
              );

              if (!g.name.endsWith('🔒')) {
                g.edit({
                  name: `${g.name} 🔒`,
                });
              } else {
                g.edit({
                  name: g.name.replace(/\s*🔒/, ''),
                });
              }
            }
          })
          .catch(() => `Erro no canal ${ch.name}`);
      }
    });
    return message.react('🔒');
  }
}
