import { GuildMember, Message, MessageEmbed, MessageReaction, TextChannel } from 'discord.js';
import WatchClient from '../client';
import Event from '../structures/event';
import constants from '../util/constants';

export default class MessageReactionAdd extends Event {
  constructor(client: WatchClient) {
    super(client, 'messageReactionAdd');
  }

  async run(reaction: MessageReaction, user: GuildMember): Promise<void> {
    const { message } = reaction;
    const channelsToLookUp = [constants.channels.suggestQueue, constants.channels.suggestInQueue];
    if (!channelsToLookUp.includes(message.channel.id)) return;
    if (user.id !== process.env.OWNER_ID) return;

    const Handler = async () => {
      if (reaction.emoji.name === '✅') {
        const confirmedChannel = this.client.channels.cache.get(
          constants.channels.suggestAccepted as `${bigint}`
        ) as TextChannel;
        const oldEmbed = message.embeds[0];
        const newEmbed = new MessageEmbed()
          .setDescription(oldEmbed.description)
          .setColor('#17ec39')
          .setThumbnail(oldEmbed.thumbnail.url)
          .setTitle('Sugestão aceita!')
          .setFooter(oldEmbed.footer.text)
          .setTimestamp(new Date(oldEmbed.timestamp))
          .setAuthor(oldEmbed.author.name, oldEmbed.author.iconURL);
        confirmedChannel.send(newEmbed);
        message.delete().catch();
      }
      if (reaction.emoji.name === '❌') {
        const negatedChannel = this.client.channels.cache.get(
          constants.channels.suggestDenied as `${bigint}`
        ) as TextChannel;

        const msg = await reaction.message.channel.send('Qual o motivo para recusar essa reação?');

        let motivo: string;
        let msgSent: Message;

        const col = msg.channel.createMessageCollector(usr => usr.author.id === user.id, {
          max: 1,
        });
        col.on('collect', nsg => {
          motivo = nsg.content;
          msgSent = nsg;

          msg.delete();
          msgSent.delete();

          const oldEmbed = message.embeds[0];
          const newEmbed = new MessageEmbed()
            .setDescription(oldEmbed.description)
            .addField('MOTIVO:', motivo)
            .setColor('#fc0505')
            .setThumbnail(oldEmbed.thumbnail.url)
            .setFooter(oldEmbed.footer.text)
            .setTimestamp(new Date(oldEmbed.timestamp))
            .setAuthor(`A ${oldEmbed.author.name} Foi Negada`, oldEmbed.author.iconURL);
          negatedChannel.send(newEmbed);
          message.delete().catch();
        });
      }
      if (reaction.emoji.name === '🟡') {
        const queueChannel = this.client.channels.cache.get(
          constants.channels.suggestInQueue as `${bigint}`
        ) as TextChannel;

        const oldEmbed = message.embeds[0];
        const newEmbed = new MessageEmbed()
          .setDescription(oldEmbed.description)
          .setColor('#ffed4b')
          .setThumbnail(oldEmbed.thumbnail.url)
          .setTitle('Lux está fazendo esta sujestão!')
          .setFooter(oldEmbed.footer.text)
          .setTimestamp(new Date(oldEmbed.timestamp))
          .setAuthor(oldEmbed.author.name, oldEmbed.author.iconURL);
        queueChannel.send(newEmbed);
        message.delete().catch();
      }
    };

    if (message.partial) {
      await reaction.fetch();
      await message.fetch();
      Handler();
    } else {
      Handler();
    }
  }
}
