import { Message, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';
import moment from 'moment';
import WatchClient from '../../client';
import Command from '../../structures/command';
import CommandContext from '../../structures/CommandContext';

import('moment-duration-format');

export default class InfoCommand extends Command {
  constructor(client: WatchClient) {
    super(client, 'info', {
      category: 'util',
    });
  }

  async run(ctx: CommandContext): Promise<void> {
    const embed = new MessageEmbed()
      .setTitle('BotInfo')
      .setColor('#f47fff')
      .addFields([
        {
          name: 'Ping',
          value: `**Host:** \`${Math.round(this.client.ws.ping)}\`ms\n**API:** \`${
            Date.now() - ctx.message.createdTimestamp
          }\`ms`,
          inline: false,
        },
        {
          name: 'Uptime',
          value: moment.duration(this.client.uptime).format('D[d], H[h], m[m], s[s]'),
          inline: false,
        },
        {
          name: '<:memoryram:762817135394553876> | Memória',
          value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`,
          inline: false,
        },
      ]);

    const Button = new MessageButton()
      .setCustomID('s')
      .setLabel('Sim')
      .setEmoji('<:eto:782022370231582721>')
      .setStyle('SUCCESS');

    const otherButton = new MessageButton().setCustomID('n').setLabel('Nao').setStyle('DANGER');

    const maisum = new MessageButton()
      .setLabel('Menhera Site FDS')
      .setURL('https://menherabot.xyz/')
      .setStyle('LINK');

    const actrow = new MessageActionRow().addComponents(Button, otherButton, maisum);

    const a = (await ctx.sendC('Você quer ver mais?', {
      embed,
      reply: { messageReference: ctx.message },
      components: [actrow],
    })) as Message;

    const filter = interacion =>
      interacion.message.id === a.id && interacion.user.id === ctx.message.author.id;

    const collector = ctx.message.channel.createMessageComponentInteractionCollector(filter, {
      time: 60000,
      max: 1,
    });
    collector.on('collect', i => {
      switch (i.customID) {
        case 's':
          otherButton.setDisabled(true);
          Button.setDisabled(true);
          actrow.spliceComponents(0, 2, [otherButton, Button]);
          i.update({
            content: 'NAISUUUU obrigada pr clicar, mas n tem nada',
            components: [actrow],
          });
          break;
        case 'n':
          i.update({
            content: 'Bah o meu vai ti fude, se n quer ent n clica',
            components: [],
          });
          break;
        default:
          break;
      }
    });
  }
}
