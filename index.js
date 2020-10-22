const Client = require('./src/WatchClient')
const config = require('./config.json')
const client = new Client({ disableMentions: "everyone", fetchAllMembers: true, partials: ['MESSAGE', 'REACTION'] })

client.loadCommands("./src/commands")
client.loadEvents("./src/events")
client.startServer()
client.login(config.token).then(() => {
    console.log("[INDEX] bot is online")
}).catch((e) => console.log(`[FATALERROR] Failure connecting to Discord! ${e.message}!`))