const Client = require('./amandinha-src/WatchClient')
const config = require('./config.json')
const client = new Client({ disableMentions: "everyone", partials: ['MESSAGE', 'REACTION'],  ws: { intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_PRESENCES', 'GUILD_MEMBERS', 'GUILD_MESSAGE_REACTIONS'] }  })

client.loadCommands("./amandinha-src/commands")
client.loadEvents("./amandinha-src/events")
client.startServer()
client.login(config.token).then(() => {
    console.log("[INDEX] bot is online")
}).catch((e) => console.log(`[FATALERROR] Failure connecting to Discord! ${e.message}!`))