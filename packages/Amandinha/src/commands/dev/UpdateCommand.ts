import { Message, MessageEmbed, TextChannel } from 'discord.js';
import WatchClient from '../../client';
import Command from '../../structures/command';
import constants from '../../util/constants';

export default class UpdateCommand extends Command {
  constructor(client: WatchClient) {
    super(client, 'update', {
      category: 'dev',
      ClientPermissions: ['EMBED_LINKS'],
      OnlyDevs: true,
    });
  }

  async run(message: Message): Promise<void> {
    const canal = this.client.channels.cache.get(constants.channels.update) as TextChannel;
    const role = message.guild.roles.cache.get(constants.roles.status);

    const embed = new MessageEmbed()
      .setTitle('🟡 | ATUALIZAÇÃO')
      .setColor('#ffe752')
      .setDescription(
        'A Menhera vai reiniciar para aplicar uma atualização\nCheque <#730904048475046069> para ver as novidades'
      )
      .setTimestamp();
    canal.send(role, embed);
    message.react('✅');
  }
}
