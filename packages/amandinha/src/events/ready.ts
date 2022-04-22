/* eslint-disable no-console */
import Logger from '@menhera-tools/logger';
import { ActivityOptions } from 'discord.js';
import WatchClient from '../client';
import Event from '../structures/event';

export default class ReadyEvent extends Event {
  constructor(client: WatchClient) {
    super(client, 'ready');
  }

  async run(): Promise<void> {
    Logger.info('Amandinha está recebendo eventos!');
    const status: Array<ActivityOptions> = [
      {
        name: 'Averiguando meu Servidor de suporte',
        type: 'PLAYING',
      },
      {
        name: 'Meu prefixo é ..',
        type: 'PLAYING',
      },
    ];

    this.client.user?.setPresence({
      activities: status,
    });
  }
}
