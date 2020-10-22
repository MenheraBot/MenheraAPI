const Client = require('./src/WatchClient')
const Server = require('./server')
const server = new Server()
const config = require('./config.json')
const client = new Client({ disableMentions: "everyone", fetchAllMembers: true, partials: ['MESSAGE', 'REACTION'] })

server.start()

client.loadCommands("./src/commands")
client.loadEvents("./src/events")
client.login(config.token).then(() => {
    console.log("[INDEX] bot is online")
}).catch((e) => console.log(`[FATALERROR] Failure connecting to Discord! ${e.message}!`))