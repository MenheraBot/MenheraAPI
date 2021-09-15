/* eslint-disable no-console */
import Logger from '@menhera-tools/logger';
import Client from './client';

const client = new Client({
  partials: ['MESSAGE', 'REACTION'],
  intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS'],
});

client.loadCommands(`${__dirname}/commands`);
client.loadEvents(`${__dirname}/events`);
client
  .login(process.env.TOKEN as string)
  .then(() => {
    Logger.info('Amandinha se conectou com a gateway do Discord!');
    /*
     * ============ ONLY UNCOMMENT THIS TO START HTTP SERVER TO INTERACTIONS
     *
     * import startServer from './server/index';
     * startServer(client);
     *
     */
  })
  .catch(e => Logger.error(`EITA PORRA, DEU MERDA AO TENTAR SE CONECTAR NO DISCORD! ${e.message}`));
