import { GuildMember, MessageEmbed, TextChannel } from 'discord.js';
import WatchClient from '../client';
import Event from '../structures/event';
import constants from '../util/constants';

export default class GuildMemberAdd extends Event {
  constructor(client: WatchClient) {
    super(client, 'guildMemberAdd');
  }

  async run(member: GuildMember): Promise<void> {
    if (member.guild.id !== constants.server) return;
    const canal = this.client.channels.cache.get(constants.channels.welcome) as TextChannel;
    const avatar = member.user.displayAvatarURL({
      dynamic: true,
    });
    const embed = new MessageEmbed()
      .setAuthor(member.user.tag, avatar)
      .setTitle('<:MenheraWave:767210250545659906> | Bem vindo')
      .setColor('#e58ff0')
      .setDescription(
        `Olá ${member}, seja bem vindx no servidor de suporte da Menhera! Para ver todos os comandos da Menhera use m!help\nBeijos de luz da Lux`
      )
      .setFooter(`UserID: ${member.id}`)
      .setImage('https://i.imgur.com/p3IUT0Y.png');
    canal.send(member, embed);
  }
}
