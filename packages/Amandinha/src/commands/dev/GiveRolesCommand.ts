import { Message } from 'discord.js';
import WatchClient from '../../client';
import Command from '../../structures/command';
import database from '../../structures/DatabaseConnection';

import constants from '../../util/constants';

export default class GiveRoleCommand extends Command {
  constructor(client: WatchClient) {
    super(client, 'giverole', {
      aliases: ['gr'],
      category: 'dev',
      ClientPermissions: ['EMBED_LINKS'],
      UserPermission: ['MANAGE_GUILD'],
      OnlyDevs: true,
    });
  }

  async run(message: Message): Promise<void> {
    message.channel.send('TA DI BOA BOY');

    const server = this.client.guilds.cache.get(constants.server); // FOI UWUUWUWUWU, ja volto

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

    const apoloMembers = [];
    const lokiMembers = [];
    const aresMembers = [];
    const somaMembers = [];
    const freyaMembers = [];

    apolo.members.forEach((member: string) => {
      if (message.guild.members.cache.has(member)) {
        if (message.guild.members.cache.get(member).roles.cache.has(roleApolo.id))
          apoloMembers.push(message.guild.members.cache.get(member).user.username);
        message.guild.members.cache.get(member).roles.add(roleApolo);
      }
    });
    loki.members.forEach((member: string) => {
      if (message.guild.members.cache.has(member)) {
        if (message.guild.members.cache.get(member).roles.cache.has(roleLoki.id))
          lokiMembers.push(message.guild.members.cache.get(member).user.tag);
        message.guild.members.cache.get(member).roles.add(roleLoki);
      }
    });
    ares.members.forEach((member: string) => {
      if (message.guild.members.cache.has(member)) {
        if (message.guild.members.cache.get(member).roles.cache.has(roleAres.id))
          aresMembers.push(message.guild.members.cache.get(member).user.tag);
        message.guild.members.cache.get(member).roles.add(roleAres);
      }
    });
    soma.members.forEach((member: string) => {
      if (message.guild.members.cache.has(member)) {
        if (message.guild.members.cache.get(member).roles.cache.has(roleSoma.id))
          somaMembers.push(message.guild.members.cache.get(member).user.tag);
        message.guild.members.cache.get(member).roles.add(roleSoma);
      }
    });
    freya.members.forEach((member: string) => {
      if (message.guild.members.cache.has(member)) {
        if (message.guild.members.cache.get(member).roles.cache.has(roleFreya.id))
          freyaMembers.push(message.guild.members.cache.get(member).user.tag);
        message.guild.members.cache.get(member).roles.add(roleFreya);
      }
    });
  }
}
