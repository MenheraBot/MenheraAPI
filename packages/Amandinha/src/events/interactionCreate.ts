import { Interaction, Message, MessageButton, MessageEmbed, TextChannel } from 'discord.js';
import WatchClient from '../client';
import Event from '../structures/event';
import constants from '../util/constants';

export default class InteractionCreate extends Event {
  constructor(client: WatchClient) {
    super(client, 'interactionCreate');
  }

  async run(interaction: Interaction): Promise<void> {
    if (!interaction.isButton()) return;
    const { message } = interaction;
    const channelsToLookUp = [constants.channels.suggestQueue, constants.channels.suggestInQueue];
    if (!channelsToLookUp.includes(interaction.channel?.id ?? 'a')) return;
    if (interaction.user.id !== process.env.OWNER_ID) return;

    const Handler = async () => {
      if (interaction.customId.startsWith('OK')) {
        const confirmedChannel = this.client.channels.cache.get(
          constants.channels.suggestAccepted
        ) as TextChannel;
        const oldEmbed = message.embeds[0];
        const newEmbed = new MessageEmbed()
          .setDescription(oldEmbed.description ?? 'a')
          .setColor('#17ec39')
          .setThumbnail(oldEmbed.thumbnail?.url ?? 'a')
          .setTitle('Sugestão aceita!')
          .setFooter(oldEmbed.footer?.text ?? 'a')
          .setAuthor(oldEmbed.author?.name ?? 'a', oldEmbed.author?.url ?? 'a');
        confirmedChannel.send({ embeds: [newEmbed] });
        (interaction.message as Message).delete().catch();
      }
      if (interaction.customId.startsWith('NO')) {
        const negatedChannel = this.client.channels.cache.get(
          constants.channels.suggestDenied
        ) as TextChannel;

        await interaction.reply('Qual o motivo para recusar essa reação?');

        let motivo: string;
        let msgSent: Message;

        const col = interaction.channel?.createMessageCollector({
          filter: usr => usr.author.id === interaction.user.id,
          max: 1,
        });

        col?.on('collect', nsg => {
          motivo = nsg.content;
          msgSent = nsg;

          interaction.deleteReply();
          msgSent.delete();

          const oldEmbed = message.embeds[0] as MessageEmbed;
          const newEmbed = new MessageEmbed()
            .setDescription(oldEmbed.description ?? 'a')
            .addField('MOTIVO:', motivo)
            .setColor('#fc0505')
            .setThumbnail(oldEmbed.thumbnail?.url ?? 'a')
            .setFooter(oldEmbed.footer?.text ?? 'a')
            .setAuthor(`A ${oldEmbed.author?.name} Foi Negada`, oldEmbed.author?.iconURL);
          negatedChannel.send({ embeds: [newEmbed] });
          (interaction.message as Message).delete().catch();
        });
      }
      if (interaction.customId.startsWith('FILA')) {
        const queueChannel = this.client.channels.cache.get(
          constants.channels.suggestInQueue
        ) as TextChannel;

        const FirstButton = new MessageButton()
          .setLabel('Negar')
          .setEmoji('❌')
          .setStyle('DANGER')
          .setCustomId('NO');

        const secondButton = new MessageButton()
          .setLabel('Aceitar')
          .setEmoji('✅')
          .setStyle('SUCCESS')
          .setCustomId('OK');

        const oldEmbed = message.embeds[0] as MessageEmbed;
        const newEmbed = new MessageEmbed()
          .setDescription(oldEmbed.description ?? 'a')
          .setColor('#ffed4b')
          .setThumbnail(oldEmbed.thumbnail?.url ?? 'a')
          .setTitle('Lux está fazendo esta sujestão!')
          .setFooter(oldEmbed.footer?.text ?? 'a')
          .setAuthor(oldEmbed.author?.name ?? 'a', oldEmbed.author?.iconURL);
        queueChannel.send({
          embeds: [newEmbed],
          components: [{ type: 1, components: [secondButton, FirstButton] }],
        });
        (interaction.message as Message).delete().catch();
      }
    };

    await interaction.channel?.messages.fetch(interaction.message.id);
    Handler();
  }
}
