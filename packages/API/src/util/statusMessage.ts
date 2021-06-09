import executeWebhook, { EmbedOptions } from '@menhera-tools/execute-webhook';

export default async function status(embed: EmbedOptions): Promise<void> {
  await executeWebhook(process.env.WEBHOOK_ID_STATUS, process.env.WEBHOOK_TOKEN_STATUS, {
    embeds: [embed],
  });
}
