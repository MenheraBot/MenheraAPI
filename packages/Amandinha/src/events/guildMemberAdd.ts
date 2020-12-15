import { GuildMember, MessageEmbed, TextChannel } from 'discord.js';
import WatchClient from '../client';
import database from '../structures/DatabaseConnection';
import Event from '../structures/event';

export default class GuildMemberAdd extends Event {
  constructor(client: WatchClient) {
    super(client, 'guildMemberAdd');
  }

  async run(member: GuildMember): Promise<void> {
    if (member.guild.id !== '717061688460967988') return;
    const canal = this.client.channels.cache.get('717061688498847801') as TextChannel;
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

    const server = this.client.guilds.cache.get('717061688460967988');

    const roleApolo = server.roles.cache.get('765069063146962995');
    const roleLoki = server.roles.cache.get('765069110018703371');
    const roleAres = server.roles.cache.get('765069139885948928');
    const roleSoma = server.roles.cache.get('765069167363096616');
    const roleFreya = server.roles.cache.get('765069003440914443');
    const apolo = await database.findById('Apolo');
    const loki = await database.familia.findById('Loki');
    const ares = await database.familia.findById('Ares');
    const soma = await database.familia.findById('Soma');
    const freya = await database.familia.findById('Freya');

    if (apolo.members.includes(member.id.toString())) member.roles.add(roleApolo);
    if (loki.members.includes(member.id.toString())) member.roles.add(roleLoki);
    if (ares.members.includes(member.id.toString())) member.roles.add(roleAres);
    if (soma.members.includes(member.id.toString())) member.roles.add(roleSoma);
    if (freya.members.includes(member.id.toString())) member.roles.add(roleFreya);
  }
}
