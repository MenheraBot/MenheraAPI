/* eslint-disable class-methods-use-this */
import { Message, MessageReaction } from 'discord.js';
import WatchClient from '../../client';
import Command from '../../structures/command';

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

    const ignored = [
      '730904048475046069',
      '765427597101760573',
      '730903350169698314',
      '757292554445127722',
      '766437546158718976',
      '766437575983366154',
      '766437591540563988',
      '766437527216193567',
      '766437565224976415',
      '717061688498847801',
      '723765136648830996',
      '717061688729534628',
      '744036370359648397',
      '766139268158062672',
      '754786823259160657',
      '717061689295503416',
      '761256642267840532',
      '767924240552296458',
      '767924268100354098',
      '773973549386825759',
      '773967693094322216',
      '773965371405107220',
    ];

    message.guild.channels.cache.forEach(ch => {
      if (!ignored.includes(ch.id)) {
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
