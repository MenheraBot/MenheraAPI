const Discord = require("discord.js");
const client = new Discord.Client({ fetchAllMembers: true, disableMentions: 'everyone' });
const config = require("./config.json");
const moment = require("moment");
const { on } = require("nodemon");
moment.locale('pt-BR')


client.on("ready", async () => {
    client.user.setActivity("Averiguando se a Menhera está Online!")
    
    const pingChannel = await client.channels.cache.get('758516769664270337');
    const menhera = await client.users.fetch(config.menheraId);

    setInterval(() => {

        //criar uma variavel para não pingar caso a presence.status da memnehra for offline
        if(menhera.presence.status == "offline") return;
        
        const filter = m => m.author.id === config.menheraId && m.content === "Pong! That's my response to your call, master"

        pingChannel.send("PINGING...").then(message =>{
            let requestTime = Date.now();
            let pingedTime;
            message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time'] })
            .then(collected => {
                const responseTime = Date.now()
                pingedTime = responseTime - requestTime
                message.channel.send(`PINGADO COM SUCESSO\n\nPing: **${pingedTime}**ms`);

                if(pingedTime > 5000) {

                    const statusCanal = client.channels.cache.get('757292554445127722')
                    const role = message.guild.roles.cache.get('758706770675105802')

                    const embed = new Discord.MessageEmbed()
                    .setTitle("<:unstable:757660425595781192> | INSTABILIDADE")
                     .setColor("#ff7c08")
                    .setDescription(`Menhera está demorando para responder requests!\nÚltimo ping: **${pingedTime}**ms`)
                     .setTimestamp()

                    statusCanal.send(embed)

                }
               
            })
            .catch(collected => {
                const statusCanal = client.channels.cache.get('757292554445127722')
                const role = message.guild.roles.cache.get('758706770675105802')

                const embed = new Discord.MessageEmbed()
                .setTitle("<:unstable:757660425595781192> | OFF")
                 .setColor("#070707")
                .setDescription(`Menhera não respondeu ao último request depois de **15000**ms`)
                 .setTimestamp()

                statusCanal.send(role, embed)
            });
        })
        
    }, 1000 * 60 * 2)

});

client.on("presenceUpdate", async (oldPresence, newPresence) =>{
    if(newPresence.user.id != config.menheraId) return;

    const canal = await client.channels.cache.get('757292554445127722')
    const role = await client.guilds.cache.get('717061688460967988').roles.cache.get('758706770675105802')

     if(newPresence.user.presence.activities.length > 0){
         if(newPresence.user.presence.activities[0].name === "Fui reiniciada com sucesso uwu"){
        const embed = new Discord.MessageEmbed()
        .setTitle("🟣 | REINICIADA")
        .setColor("#792bd1")
        .setDescription("A Menhera foi reiniciada e já está respondendo à comandos")
        .setTimestamp()
        canal.send(role, embed)
    } }

    if(oldPresence.status == newPresence.status) return;
    if(newPresence.status == "online"){
        const embed = new Discord.MessageEmbed()
        .setTitle("🟢 | ONLINE")
        .setColor("#05ff1c")
        .setDescription("A Menhera está ONLINE novamente")
        .setTimestamp()
        canal.send(role, embed)
}
    if(newPresence.status == "offline"){
        const embed = new Discord.MessageEmbed()
        .setTitle("🔴 | OFFLINE")
        .setColor("#ff0505")
        .setDescription("A Menhera acaba de ficar OFFLINE, vou notificar minha dona para ver isso")
        .setTimestamp()
        canal.send(role,embed)
}
})

client.on("message", async message => {
    if (message.author.id !== config.id) return;

    const canal = await client.channels.cache.get('757292554445127722')
    const role = message.guild.roles.cache.get('758706770675105802')

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase();

    if(comando === "update"){
    
        const embed = new Discord.MessageEmbed()
        .setTitle("🟡 | ATUALIZAÇÃO")
        .setColor("#ffe752")
        .setDescription("A Menhera vai reiniciar para aplicar uma atualização\nCheque <#730904048475046069> para ver as novidades")
        .setTimestamp()
        canal.send(role, embed)
    }   

    if(comando === "i"){
    
            const embed = new Discord.MessageEmbed()
            .setTitle("<:unstable:757660425595781192> | INSTABILIDADE")
            .setColor("#ff7c08")
            .setDescription(args.join(" "))
            .setTimestamp()
            canal.send(role, embed)
    }

    if(comando === "ping"){
        message.channel.send(client.ws.ping + "ms")
    }

    if(comando === "help"){
        message.channel.send("**COMANDOS:**\n/help\n/i\n/update\n/ping")
    }

});

client.login(config.token);