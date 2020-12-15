import { Message, TextChannel } from 'discord.js';
import WatchClient from '../../client';
import Command from '../../structures/command';

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

    const server = this.client.guilds.cache.get('717061688460967988');

    const roleApolo = server.roles.cache.get('765069063146962995');
    const roleLoki = server.roles.cache.get('765069110018703371');
    const roleAres = server.roles.cache.get('765069139885948928');
    const roleSoma = server.roles.cache.get('765069167363096616');
    const roleFreya = server.roles.cache.get('765069003440914443');

    const channelApolo = server.channels.cache.get('766437591540563988') as TextChannel;
    const channelLoki = server.channels.cache.get('766437565224976415') as TextChannel;
    const channelAres = server.channels.cache.get('766437546158718976') as TextChannel;
    const channelSoma = server.channels.cache.get('766437527216193567') as TextChannel;
    const channelFreya = server.channels.cache.get('766437575983366154') as TextChannel;

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
