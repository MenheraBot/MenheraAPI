import { Message, MessageEmbed } from 'discord.js';
import WatchClient from '../../client';
import Command from '../../structures/command';
import util from 'util';

export default class EvalCommand extends Command {
  constructor(client: WatchClient) {
    super(client, 'eval', {
      category: 'dev',
      ClientPermissions: ['EMBED_LINKS'],
      OnlyDevs: true,
    });
  }

  async run(message: Message, args: string[]): Promise<void> {
    try {
      // eslint-disable-next-line no-eval
      let evaled = await eval(args.join(' '));
      evaled = util.inspect(evaled, { depth: 1 });
      evaled = evaled.replace(new RegExp(`${this.client.token}`, 'g'), undefined);

      if (evaled.length > 1800) evaled = `${evaled.slice(0, 1800)}...`;
      message.channel.send(evaled, { code: 'js' });
    } catch (err) {
      const errorMessage = err.stack.length > 1800 ? `${err.stack.slice(0, 1800)}...` : err.stack;
      const embed = new MessageEmbed();
      embed.setColor('#ff0000');
      embed.setTitle('<:negacao:759603958317711371> | Erro');
      embed.setDescription(`\`\`\`js\n${errorMessage}\`\`\``);

      message.channel.send(embed);
    }
  }
}
