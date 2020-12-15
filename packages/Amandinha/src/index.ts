import logger from '@menhera-tools/logger';
import Client from './client';

const client = new Client({
  disableMentions: 'everyone',
  partials: ['MESSAGE', 'REACTION'],
  ws: {
    intents: [
      'GUILDS',
      'GUILD_MESSAGES',
      'GUILD_PRESENCES',
      'GUILD_MEMBERS',
      'GUILD_MESSAGE_REACTIONS',
    ],
  },
});

client.loadCommands(`src/commands`);
client.loadEvents(`${__dirname}/events`);
client
  .login(process.env.TOKEN)
  .then(() => {
    logger.info('Amandinha ta voando alto!');
  })
  .catch(e => logger.error(`EITA PORRA, DEU MERDA AO TENTAR SE CONECTAR NO DISCORD! ${e.message}`));
