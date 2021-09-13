/* eslint-disable no-console */
import startServer from './server/index';
import Client from './client';

startServer();

const client = new Client({
  partials: ['MESSAGE', 'REACTION'],
  intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS'],
});

client.loadCommands(`${__dirname}/commands`);
client.loadEvents(`${__dirname}/events`);
client
  .login(process.env.TOKEN as string)
  .then(() => {
    console.info('Amandinha ta voando alto!');
  })
  .catch(e =>
    console.error(`EITA PORRA, DEU MERDA AO TENTAR SE CONECTAR NO DISCORD! ${e.message}`)
  );
