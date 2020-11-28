import executeWebhook, { EmbedOptions } from '@menhera-tools/execute-webhook';
import { Response } from 'express';
import logger from '@menhera-tools/logger';
import { Colors } from './interfaces';

export async function status(embed: EmbedOptions): Promise<void> {
  await executeWebhook(process.env.WEBHOOK_ID_STATUS, process.env.WEBHOOK_TOKEN_STATUS, {
    embeds: [embed],
  });
}

export async function github(stats: number, message: string): Promise<void> {
  const isError = stats > 399;
  const color = isError ? Colors.Red : Colors.Green;
  const thumbnail = isError
    ? 'https://i.imgur.com/t94XkgG.png'
    : 'https://cdn140.picsart.com/283880390029211.png?type=webp&to=min&r=640';

  await executeWebhook(process.env.WEBHOOK_ID_GITHUB, process.env.WEBHOOK_TOKEN_GITHUB, {
    embeds: [
      {
        title: String(stats),
        description: message,
        color,
        timestamp: new Date(),
        thumbnail: { url: thumbnail },
      },
    ],
  });
}

export function responseWebhook(res: Response, promise: Promise<unknown>): Promise<Response> {
  return promise
    .then(() => res.sendStatus(201))
    .catch(error => {
      logger.error(error);
      return res.status(502).json({ message: 'Could not send webhook' });
    });
}

export function responseStatus(res: Response, embed: EmbedOptions): Promise<Response> {
  return responseWebhook(res, status(embed));
}

export function responseGithub(res: Response, stats: number, message: string): Promise<Response> {
  return responseWebhook(res, github(stats, message));
}
