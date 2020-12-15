import Logger from '@menhera-tools/logger';
import { ActivityOptions } from 'discord.js';
import WatchClient from '../client';
import TopFamilyChecks from '../structures/TopFamilyChecks';
import database from '../structures/DatabaseConnection';
import Event from '../structures/event';
import constants from '../util/constants';

export default class ReadyEvent extends Event {
  constructor(client: WatchClient) {
    super(client, 'ready');
  }

  async run(): Promise<void> {
    Logger.info(' MENHERA WATCH IS READY');
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

    setInterval(() => {
      const randomStatus = status[Math.floor(Math.random() * status.length)];
      this.client.user.setPresence({
        activity: randomStatus,
      });
    }, 1000 * 60);

    setInterval(async () => {
      TopFamilyChecks(this.client);
      const server = this.client.guilds.cache.get(constants.server);

      const roleApolo = server.roles.cache.get(constants.roles.apolo);
      const roleLoki = server.roles.cache.get(constants.roles.loki);
      const roleAres = server.roles.cache.get(constants.roles.ares);
      const roleSoma = server.roles.cache.get(constants.roles.soma);
      const roleFreya = server.roles.cache.get(constants.roles.freya);

      const apolo = await database.findById('Apolo');
      const loki = await database.findById('Loki');
      const ares = await database.findById('Ares');
      const soma = await database.findById('Soma');
      const freya = await database.findById('Freya');

      apolo.members.forEach((member: string) => {
        if (server.members.cache.has(member)) {
          server.members.cache.get(member).roles.add(roleApolo);
        }
      });
      loki.members.forEach((member: string) => {
        if (server.members.cache.has(member)) {
          server.members.cache.get(member).roles.add(roleLoki);
        }
      });
      ares.members.forEach((member: string) => {
        if (server.members.cache.has(member)) {
          server.members.cache.get(member).roles.add(roleAres);
        }
      });
      soma.members.forEach((member: string) => {
        if (server.members.cache.has(member)) {
          server.members.cache.get(member).roles.add(roleSoma);
        }
      });
      freya.members.forEach((member: string) => {
        if (server.members.cache.has(member)) {
          server.members.cache.get(member).roles.add(roleFreya);
        }
      });
    }, 1000 * 60 * 60 * 12);
  }
}
