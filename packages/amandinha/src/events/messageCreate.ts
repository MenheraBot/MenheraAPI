/* eslint-disable no-new */
/* eslint-disable consistent-return */
import { Message, MessageButton, MessageEmbed, TextBasedChannels } from 'discord.js';
import TalkAward from '../structures/TalkAward';
import WatchClient from '../client';
import CommandContext from '../structures/CommandContext';
import Event from '../structures/event';

export default class MessageReceive extends Event {
  constructor(client: WatchClient) {
    super(client, 'messageCreate');
  }

  async run(message: Message): Promise<Message | void> {
    if (message.channel.type === 'DM') return;
    if (message.author?.bot) return;
    if (message.channelId === '879207097936543744') {
      const cor = `#${`000000${Math.random().toString(16).slice(2, 8).toUpperCase()}`.slice(
        -6
      )}` as const;

      const embed = new MessageEmbed()
        .setDescription(`**${message.content}**`)
        .setColor(cor)
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setFooter(`ID do usuário: ${message.author.id} | ${message.id}`)
        .setTimestamp()
        .setAuthor(
          `Sugestão de ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        );

      const firstButton = new MessageButton()
        .setLabel('Aceitar')
        .setStyle('SUCCESS')
        .setCustomId('OK');

      const secondButton = new MessageButton()
        .setLabel('Negar')
        .setStyle('DANGER')
        .setCustomId('NO');

      const thirdButton = new MessageButton()
        .setLabel('Fila')
        .setCustomId('FILA')
        .setEmoji('🟡')
        .setStyle('PRIMARY');

      (this.client.channels.cache.get('723765136648830996') as TextBasedChannels).send({
        embeds: [embed],
        components: [{ type: 1, components: [firstButton, secondButton, thirdButton] }],
      });
      message.delete();
      const sent = await message.channel.send(
        `Obrigada por me enviar uma sugestão ${message.author.toString()}! Minha dona já possui conhecimento dela, e vai averiguar o mais rápido possível. Beijinhos >.<`
      );

      setTimeout(() => sent.delete(), 10000);
      return;
    }

    if (message.content.toLowerCase().startsWith('m!')) {
      message.channel.send(
        `Oii ${message.author.toString()}, a Menhera não usa mais comandos de mensagem!\nUse os comandos slash. Eles começam com \`/\`. Ao digitar, uma janela aparecerá com todos comandos existentes, escolha o que você quer, e parte pro abraço >..<`
      );
      return;
    }

    TalkAward(message);

    if (!message.content.startsWith(process.env.PREFIX as string)) return;
    const args = message.content
      .slice((process.env.PREFIX as string).length)
      .trim()
      .split(/ +/g);
    const command = args.shift()?.toLowerCase();
    const comando =
      this.client.commands.get(command as string) ||
      this.client.commands.get(this.client.aliases.get(command as string) as string);
    if (!comando) return;

    const ctx = new CommandContext(this.client, message, args);

    if (comando.config.OnlyDevs) {
      if (process.env.OWNER_ID !== message.author.id)
        return ctx.reply('Este comando está disponível somente no servidor da Menhera!');
    }

    const userPermission = comando.config.UserPermission;
    const clientPermission = comando.config.ClientPermissions;
    if (userPermission !== null) {
      if (!message.member?.permissions.has(userPermission)) {
        const perm = userPermission.map(value => `\`${value}\``).join(', ');
        return ctx.reply(
          `Você precisa das permissões: ${perm} pra executar isso, ${message.author}`
        );
      }
    }
    if (clientPermission !== null) {
      if (
        !message.guild?.me?.permissions.has(clientPermission) ||
        !message.channel.permissionsFor(this.client.user?.id ?? 'a')?.has(clientPermission)
      ) {
        const perm = clientPermission.map(value => `\`${value}\``).join(', ');
        return ctx.reply(`O cliente precisa das permissões: ${perm} pra executar isso`);
      }
    }

    try {
      new Promise(res => res(comando.run(ctx)));
    } catch {
      // Do nothing
    }
  }
}
