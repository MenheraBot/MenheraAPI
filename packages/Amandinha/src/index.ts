/* eslint-disable no-console */
import startServer from './server/index';
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
  console.info('Amandinha ta voando alto!');
  startServer(client);
})
.catch(e =>
  console.error(`EITA PORRA, DEU MERDA AO TENTAR SE CONECTAR NO DISCORD! ${e.message}`)
  );
  