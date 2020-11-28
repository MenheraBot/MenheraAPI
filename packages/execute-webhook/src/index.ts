/* eslint-disable camelcase */

import axios from 'axios';

export interface EmbedImageOptions {
  url?: string;
}

export interface EmbedFooterOptions {
  icon_url?: string;
  text: string;
}

export interface EmbedAuthorOptions {
  icon_url?: string;
  name: string;
  url?: string;
}

export interface EmbedField {
  inline?: boolean;
  name: string;
  value: string;
}

export interface EmbedOptions {
  author?: EmbedAuthorOptions;
  color?: number;
  description?: string;
  fields?: EmbedField[];
  footer?: EmbedFooterOptions;
  image?: EmbedImageOptions;
  thumbnail?: EmbedImageOptions;
  timestamp?: string | Date;
  title?: string;
  url?: string;
}

export interface FileOptions {
  name: string;
  file: string;
}

export interface WebhookOptions {
  content?: string;
  embeds?: Array<EmbedOptions>;
  username?: string;
  avatar_url?: string;
  tts?: boolean;
  file?: FileOptions;
}

export default async function executeWebhook(
  webhookID: string,
  webhookToken: string,
  options: WebhookOptions
): Promise<unknown> {
  const DISCORD_API_URL = 'https://discord.com/api';
  const url = `${DISCORD_API_URL}/webhooks/${webhookID}/${webhookToken}`;
  return axios({
    url,
    method: 'POST',
    data: options,
  });
}
