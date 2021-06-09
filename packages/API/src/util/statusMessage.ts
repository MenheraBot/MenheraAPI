import executeWebhook, { EmbedOptions } from '@menhera-tools/execute-webhook';
import { StatusRole } from './constants';

export default async function status(embed: EmbedOptions): Promise<void> {
  await executeWebhook(process.env.WEBHOOK_ID_STATUS, process.env.WEBHOOK_TOKEN_STATUS, {
    content: StatusRole,
    embeds: [embed],
  });
}
