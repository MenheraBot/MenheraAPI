const Discord = require("discord.js");
const client = new Discord.Client({ fetchAllMembers: true, disableMentions: 'everyone' });
const config = require("./config.json");
const moment = require("moment");
const { on } = require("nodemon");
moment.locale('pt-BR')


client.on("ready", async () => {
    client.user.setActivity("Averiguando se a Menhera está Online!")

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

    if(!message.content.startsWith(config.prefix)) return

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