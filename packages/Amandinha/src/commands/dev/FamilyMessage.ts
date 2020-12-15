import { Message, TextChannel } from 'discord.js';
import WatchClient from '../../client';
import Command from '../../structures/command';
import constants from '../../util/constants';

export default class FamilyMessage extends Command {
  constructor(client: WatchClient) {
    super(client, 'familymessage', {
      aliases: ['fm'],
      category: 'dev',
      ClientPermissions: ['EMBED_LINKS'],
      UserPermission: ['ADMINISTRATOR'],
      OnlyDevs: true,
    });
  }

  async run(message: Message, args: Array<string>): Promise<void> {
    message.channel.send('Ta la minha linda');

    const server = this.client.guilds.cache.get(constants.server);

    const roleApolo = server.roles.cache.get(constants.roles.apolo);
    const roleLoki = server.roles.cache.get(constants.roles.loki);
    const roleAres = server.roles.cache.get(constants.roles.ares);
    const roleSoma = server.roles.cache.get(constants.roles.soma);
    const roleFreya = server.roles.cache.get(constants.roles.freya);

    const channelApolo = server.channels.cache.get(constants.channels.apolo) as TextChannel;
    const channelLoki = server.channels.cache.get(constants.channels.loki) as TextChannel;
    const channelAres = server.channels.cache.get(constants.channels.ares) as TextChannel;
    const channelSoma = server.channels.cache.get(constants.channels.soma) as TextChannel;
    const channelFreya = server.channels.cache.get(constants.channels.freya) as TextChannel;

    if (!args[0]) {
      message.channel.send('Só faltou lansar o texto');
      return;
    }

    channelApolo.send(`${args.join(' ')}\n\n${roleApolo}`);
    channelLoki.send(`${args.join(' ')}\n\n${roleLoki}`);
    channelAres.send(`${args.join(' ')}\n\n${roleAres}`);
    channelSoma.send(`${args.join(' ')}\n\n${roleSoma}`);
    channelFreya.send(`${args.join(' ')}\n\n${roleFreya}`);

    message.react('✅');
  }
}
