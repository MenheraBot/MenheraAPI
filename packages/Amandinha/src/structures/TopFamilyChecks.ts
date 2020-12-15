/* eslint-disable no-underscore-dangle */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
import Logger from '@menhera-tools/logger';
import { MessageEmbed, TextChannel } from 'discord.js';
import moment from 'moment';
import WatchClient from '../client';
import familia from './DatabaseConnection';
import familyInterface from '../util/interfaces';
import constants from '../util/constants';

export default async function run(client: WatchClient): Promise<void> {
  const canal = client.channels.cache.get('765427597101760573') as TextChannel;
  canal.messages.fetch().then(async messages => {
    const filtred = messages.filter(m => m.author.id === client.user.id);
    filtred.forEach(msg => {
      msg.delete({ timeout: 1 });
    });
  });

  const server = client.guilds.cache.get(constants.server);
  const roles = [
    server.roles.cache.get(constants.roles.freya),
    server.roles.cache.get(constants.roles.apolo),
    server.roles.cache.get(constants.roles.loki),
    server.roles.cache.get(constants.roles.soma),
    server.roles.cache.get(constants.roles.ares),
  ];

  moment.locale('pt-br');

  const embed = new MessageEmbed().setTitle(
    `🔱 | Placar das familias do dia ${moment(Date.now()).format('DD/MM/YYYY')}`
  );

  familia.find(
    {},
    ['_id', 'members', 'levelFamilia', 'bank'],
    {
      skip: 0,
      limit: 5,
      sort: {
        levelFamilia: -1,
        bank: -1,
      },
    },
    (err, res) => {
      if (err) Logger.error(err);

      let cor;

      const map = new Map();
      map.set('Freya', roles[0]);
      map.set('Apolo', roles[1]);
      map.set('Loki', roles[2]);
      map.set('Soma', roles[3]);
      map.set('Ares', roles[4]);

      res.sort(
        (a: familyInterface, b: familyInterface) => parseInt(b.bank, 10) - parseInt(a.bank, 10)
      );

      const primeiraFamilia = res[0]._id;

      switch (primeiraFamilia) {
        case 'Freya':
          cor = roles[0].hexColor;
          break;
        case 'Apolo':
          cor = roles[1].hexColor;
          break;
        case 'Loki':
          cor = roles[2].hexColor;
          break;
        case 'Soma':
          cor = roles[3].hexColor;
          break;
        case 'Ares':
          cor = roles[4].hexColor;
          break;
        default:
          Logger.error(
            'Eu duvido muito que isso aqui seja atingido, mas se sim... ERROR STACK ON ARCHIVE TOP FAMILY CHECKS NA LINE EIGTHY ONE COLUNA SLA A HUNDRED IN THE SWITCH CASE ALI'
          );
      }

      let txt = '';

      for (let i = 0; i < res.length; i++) {
        txt += `**${i + 1}** - ${map.get(res[i]._id)} | **${res[i].bank}** :gem:\n`;
        // embed.addField(`${i + 1} - ${map.get(res[i]._id)}`, `:fleur_de_lis: | **Nível da Família:** ${res[i].levelFamilia}\n💎 | **Dinheiro da Família:** ${res[i].bank}\n<:God:758474639570894899> | **Membros:** ${res[i].members.length}`)
      }
      return canal.send(embed.setColor(cor).setDescription(txt));
    }
  );
}
