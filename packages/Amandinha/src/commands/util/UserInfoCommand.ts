import { Message, MessageEmbed, User } from 'discord.js';
import moment from 'moment';
import WatchClient from '../../client';
import Command from '../../structures/command';
import CommandContext from '../../structures/CommandContext';

export default class UserInfoCommand extends Command {
  constructor(client: WatchClient) {
    super(client, 'userinfo', {
      category: 'util',
    });
  }

  async run(ctx: CommandContext): Promise<Message> {
    moment.locale('pt-br');

    let member: User;
    if (ctx.args[0]) {
      try {
        member = await this.client.users.fetch(ctx.args[0].replace(/[<@!>]/g, ''));
      } catch {
        return ctx.reply('Usuário inexistente');
      }
    } else member = ctx.message.author;

    const status = `${member.presence.status}`
      .replace('dnd', '🔴 | Não Perturbe')
      .replace('idle', '🟡 | Ausente')
      .replace('offline', '⚪ | Offline')
      .replace('online', '🟢 | Online');
    const color = ctx.message.guild.members.cache.get(member.id)
      ? ctx.message.guild.members.cache.get(member.id).displayHexColor
      : '#000000';
    const avatar = member.displayAvatarURL({ dynamic: true, format: 'png' });

    const embed = new MessageEmbed()
      .setColor(color)
      .setThumbnail(avatar)
      .addField(':bookmark: Tag do Discord', `\`${member.tag}\``, true)
      .addField(':computer: ID do Discord', `\`${member.id}\``, true)
      .addField(
        ':trophy: Cargo mais Alto',
        ctx.message.guild.members.cache.get(member.id)
          ? ctx.message.guild.members.cache.get(member.id).roles.highest.toString()
          : '`USER NOT IN GUILD`',
        true
      )
      .addField('Status', status, true)
      .addField(
        ':star2: Entrou dia',
        ctx.message.guild.members.cache.get(member.id)
          ? moment(ctx.message.guild.members.cache.get(member.id).joinedAt).format('DD/MM/YYYY')
          : '`USER NOT IN GUILD`',
        true
      )
      .addField(':date: Conta criada dia', moment(member.createdAt).format('DD/MM/YYYY'), true);

    return ctx.sendEmbed(embed, true);
  }
}
