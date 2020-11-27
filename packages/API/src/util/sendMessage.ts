import executeWebhook, { EmbedOptions } from '@menhera-tools/execute-webhook';
import { Colors } from './interfaces';

export async function status(embed: EmbedOptions) {
  executeWebhook(process.env.WEBHOOK_ID_STATUS, process.env.WEBHOOK_TOKEN_STATUS, {
    embeds: [embed],
  });
}

export async function github(stats: number, message: string) {
  const isError = stats > 399;
  const color = isError ? Colors.Red : Colors.Green;
  const thumbnail = isError
    ? 'https://i.imgur.com/t94XkgG.png'
    : 'https://cdn140.picsart.com/283880390029211.png?type=webp&to=min&r=640';

  executeWebhook(process.env.WEBHOOK_ID_GITHUB, process.env.WEBHOOK_TOKEN_GITHUB, {
    embeds: [{
      title: String(stats),
      description: message,
      color,
      timestamp: new Date(),
      thumbnail: { url: thumbnail },
    }],
  });
}
