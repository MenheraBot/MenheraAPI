const Discord = require("discord.js");
const client = new Discord.Client({ fetchAllMembers: true, disableMentions: 'everyone' });
const config = require("./config.json");
const moment = require("moment")
moment.locale('pt-BR')


client.on("ready", () => {
    client.user.setActivity("Averiguando se a Menhera está Online!")
});

client.on("presenceUpdate", async (oldPresence, newPresence) =>{

    if(newPresence.user.id != config.menheraId) return;
    if(newPresence.user.presence.status != oldPresence.user.presence.status) return;
    const canal = await client.channels.cache.get('757292554445127722')
    if(newPresence.user.presence.status == "online"){
        const embed = new Discord.MessageEmbed()
        .setTitle("🟢 | ONLINE")
        .setColor("#05ff1c")
        .setDescription("A Menhera está ONLINE novamente")
        .setTimestamp()
        canal.send(embed)
         
}
    if(newPresence.user.presence.status == "offline"){
        const lux = client.users.cache.get(config.id)
        const embed = new Discord.MessageEmbed()
        .setTitle("🔴 | OFFLINE")
        .setColor("#ff0505")
        .setDescription("A Menhera acaba de ficar OFFLINE, vou notificar minha dona para ver isso")
        .setTimestamp()
        canal.send(lux,embed)
        lux.send(`A MENHERA FICOU OFFLINE AGORA\n${moment.utc(Date.now()).format('LLLL')}`)
}
    

})

client.on("message", async message => {
    
    const canal = await client.channels.cache.get('757292554445127722')

    if (message.author.id !== config.id) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase();

    if(comando === "update"){
    
        const embed = new Discord.MessageEmbed()
        .setTitle("🟡 | ATUALIZAÇÃO")
        .setColor("#ffe752")
        .setDescription("A Menhera vai reiniciar para aplicar uma atualização\nCheque <#730904048475046069> para ver as novidades")
        .setTimestamp()
        canal.send(embed)
    }   

    if(comando === "i"){
    
            const embed = new Discord.MessageEmbed()
            .setTitle("<:unstable:757660425595781192> | INSTABILIDADE")
            .setColor("#ff7c08")
            .setDescription(args.join(" "))
            .setTimestamp()
            canal.send(embed)
    }

    if(comando === "ping"){
        message.channel.send(client.ws.ping + "ms")
    }

    if(comando === "help"){
        message.channel.send("**COMANDOS:**\n/help\n/i\n/update\n/ping")
    }

});

client.login(config.token);