/* eslint-disable class-methods-use-this */
import RomeroBrito from 'nekos.life';
import { Message, MessageEmbed } from 'discord.js';
import Command from '../../structures/command';
import WatchClient from '../../client';

const { nsfw } = new RomeroBrito();

export default class NsfwCommand extends Command {
  constructor(client: WatchClient) {
    super(client, 'nsfw', {
      aliases: ['hentão', 'hentai'],
      ClientPermissions: ['EMBED_LINKS'],
      category: 'diversão',
    });
  }

  async run(message: Message, args: Array<string>): Promise<Message> {
    if (message.channel.type === 'text' && !message.channel.nsfw)
      return message.channel.send(`Este comando é restrito à canais NSFW`);

    const options = [
      'anal',
      'bj',
      'mamada',
      'peito',
      'classic',
      'cumarts',
      'cumsluts',
      'ero',
      'erofeet',
      'erokemonomimi',
      'erokitsune',
      'eroneko',
      'eroyuri',
      'pe',
      'pegif',
      'femdom',
      'futanari',
      'gasm',
      'solo',
      'sologif',
      'hentai',
      'holo',
      'holoero',
      'kemonomimi',
      'keta',
      'raposa',
      'kuni',
      'lesbian',
      'neko',
      'nekogif',
      'pussy',
      'pussyart',
      'pussygif',
      'hentaigif',
      'spank',
      'tits',
      'trap',
      'yuri',
      'loli',
    ];

    if (!args[0]) return message.channel.send(`Opções disponíveis: \`${options.join('`, `')}\``);
    let link: string;

    switch (args[0].toLowerCase()) {
      case 'anal':
        link = (await nsfw.anal()).url;
        break;
      case 'bj':
        link = (await nsfw.bJ()).url;
        break;
      case 'mamada':
        link = (await nsfw.blowJob()).url;
        break;
      case 'peito':
        link = (await nsfw.boobs()).url;
        break;
      case 'classic':
        link = (await nsfw.classic()).url;
        break;
      case 'cumarts':
        link = (await nsfw.cumArts()).url;
        break;
      case 'cumsluts':
        link = (await nsfw.cumsluts()).url;
        break;
      case 'ero':
        link = (await nsfw.ero()).url;
        break;
      case 'erofeet':
        link = (await nsfw.eroFeet()).url;
        break;
      case 'erokemonomimi':
        link = (await nsfw.eroKemonomimi()).url;
        break;
      case 'erokitsune':
        link = (await nsfw.eroKitsune()).url;
        break;
      case 'eroneko':
        link = (await nsfw.eroNeko()).url;
        break;
      case 'eroyuri':
        link = (await nsfw.eroYuri()).url;
        break;
      case 'pe':
        link = (await nsfw.feet()).url;
        break;
      case 'pegif':
        link = (await nsfw.feetGif()).url;
        break;
      case 'femdom':
        link = (await nsfw.femdom()).url;
        break;
      case 'futanari':
        link = (await nsfw.futanari()).url;
        break;
      case 'gasm':
        link = (await nsfw.gasm()).url;
        break;
      case 'solo':
        link = (await nsfw.girlSolo()).url;
        break;
      case 'sologif':
        link = (await nsfw.girlSoloGif()).url;
        break;
      case 'hentai':
        link = (await nsfw.hentai()).url;
        break;
      case 'holo':
        link = (await nsfw.holo()).url;
        break;
      case 'holoero':
        link = (await nsfw.holoEro()).url;
        break;
      case 'kemonomimi':
        link = (await nsfw.kemonomimi()).url;
        break;
      case 'keta':
        link = (await nsfw.keta()).url;
        break;
      case 'raposa':
        link = (await nsfw.kitsune()).url;
        break;
      case 'kuni':
        link = (await nsfw.kuni()).url;
        break;
      case 'lesbian':
        link = (await nsfw.lesbian()).url;
        break;
      case 'neko':
        link = (await nsfw.neko()).url;
        break;
      case 'nekogif':
        link = (await nsfw.nekoGif()).url;
        break;
      case 'pussy':
        link = (await nsfw.pussy()).url;
        break;
      case 'pussyart':
        link = (await nsfw.pussyArt()).url;
        break;
      case 'pussygif':
        link = (await nsfw.pussyWankGif()).url;
        break;
      case 'hentaigif':
        link = (await nsfw.randomHentaiGif()).url;
        break;
      case 'spank':
        link = (await nsfw.spank()).url;
        break;
      case 'tits':
        link = (await nsfw.tits()).url;
        break;
      case 'trap':
        link = (await nsfw.trap()).url;
        break;
      case 'yuri':
        link = (await nsfw.yuri()).url;
        break;
      case 'loli':
        link = 'https://i.imgur.com/7jfZLgw.png';
        break;
      default:
        return message.channel.send(`Opções disponíveis: \`${options.join('`, `')}\``);
    }

    const embed = new MessageEmbed().setImage(link);
    return message.channel.send(embed);
  }
}
