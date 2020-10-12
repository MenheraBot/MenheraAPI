const Discord = require("discord.js");
const client = new Discord.Client({ fetchAllMembers: true, disableMentions: 'everyone' });
const config = require("./config.json");
const moment = require("moment");
const database = require("./schemas/familia")
moment.locale('pt-BR')

const mongoose = require("mongoose");
mongoose.connect(config.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) return console.log(`(x) Error to connecting to database \n${err}`)
  console.log("[DATABASE] Conectado com sucesso à database")
})

client.on("ready", async () => {
    client.user.setActivity("Averiguando se a Menhera está Online!")
    console.log("[READY] MENHERA WATCH IS READY")
});

client.on("guildMemberAdd", async member => {
    const server = client.guilds.cache.get("717061688460967988")

    const roleApolo = server.roles.cache.get('765069063146962995')
    const roleLoki = server.roles.cache.get('765069110018703371')
    const roleAres = server.roles.cache.get('765069139885948928')
    const roleSoma = server.roles.cache.get('765069167363096616')
    const roleFreya = server.roles.cache.get('765069003440914443')

    const apolo = await database.findById("Apolo")
    const loki = await database.findById("Loki")
    const ares = await database.findById("Ares")
    const soma = await database.findById("Soma")
    const freya = await database.findById("Freya")

    if(apolo.members.inlcudes(member.id)) server.members.cache.get(member.id).roles.add(roleApolo)
    if(loki.members.inlcudes(member.id)) server.members.cache.get(member.id).roles.add(roleLoki)
    if(ares.members.inlcudes(member.id)) server.members.cache.get(member.id).roles.add(roleAres)
    if(soma.members.inlcudes(member.id)) server.members.cache.get(member.id).roles.add(roleSoma)
    if(freya.members.inlcudes(member.id)) server.members.cache.get(member.id).roles.add(roleFreya)

})

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

    if(comando === "gr"){
        message.channel.send("BELEZA")
        
    const server = client.guilds.cache.get("717061688460967988")

    const roleApolo = server.roles.cache.get('765069063146962995')
    const roleLoki = server.roles.cache.get('765069110018703371')
    const roleAres = server.roles.cache.get('765069139885948928')
    const roleSoma = server.roles.cache.get('765069167363096616')
    const roleFreya = server.roles.cache.get('765069003440914443')

    const apolo = await database.findById("Apolo")
    const loki = await database.findById("Loki")
    const ares = await database.findById("Ares")
    const soma = await database.findById("Soma")
    const freya = await database.findById("Freya")

        apolo.members.forEach(member => {
            if(message.guild.members.cache.has(member)) message.guild.members.cache.get(member).roles.add(roleApolo)
        })
        loki.members.forEach(member => {
            if(message.guild.members.cache.has(member)) message.guild.members.cache.get(member).roles.add(roleLoki)
        })
        ares.members.forEach(member => {
            if(message.guild.members.cache.has(member)) message.guild.members.cache.get(member).roles.add(roleAres)
        })
        soma.members.forEach(member => {
            if(message.guild.members.cache.has(member)) message.guild.members.cache.get(member).roles.add(roleSoma)
        })
        freya.members.forEach(member => {
            if(message.guild.members.cache.has(member)) message.guild.members.cache.get(member).roles.add(roleFreya)
        })

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