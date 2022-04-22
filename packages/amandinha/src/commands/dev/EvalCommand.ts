/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { MessageEmbed } from 'discord.js';
import util from 'util';
import WatchClient from '../../client';
import Command from '../../structures/command';
import CommandContext from '../../structures/CommandContext';

export default class EvalCommand extends Command {
  constructor(client: WatchClient) {
    super(client, 'eval', {
      category: 'dev',
      ClientPermissions: ['EMBED_LINKS'],
      OnlyDevs: true,
    });
  }

  async run(ctx: CommandContext): Promise<void> {
    try {
      // eslint-disable-next-line no-eval
      let evaled = await eval(ctx.args.join(' '));
      evaled = util.inspect(evaled, { depth: 1 });
      evaled = evaled.replace(new RegExp(`${this.client.token}`, 'g'), undefined);

      if (evaled.length > 1800) evaled = `${evaled.slice(0, 1800)}...`;
      ctx.sendR({ content: evaled, reply: { messageReference: ctx.message } });
    } catch (err) {
      if (!(err instanceof Error && err.stack)) return;
      const errorMessage = err.stack.length > 1800 ? `${err.stack.slice(0, 1800)}...` : err.stack;
      const embed = new MessageEmbed();
      embed.setColor('#ff0000');
      embed.setTitle('<:negacao:759603958317711371> | Erro');
      embed.setDescription(`\`\`\`js\n${errorMessage}\`\`\``);

      ctx.sendEmbed(embed, true);
    }
  }
}
