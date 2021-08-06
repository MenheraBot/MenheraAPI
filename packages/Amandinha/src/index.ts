/* eslint-disable no-console */
import Client from './client';

const client = new Client({
  partials: ['MESSAGE'],
  intents: ['GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS'],
});

client.loadCommands(`src/commands`);
client.loadEvents(`${__dirname}/events`);
client
  .login(process.env.TOKEN)
  .then(() => {
    console.info('Amandinha ta voando alto!');
  })
  .catch(e =>
    console.error(`EITA PORRA, DEU MERDA AO TENTAR SE CONECTAR NO DISCORD! ${e.message}`)
  );
