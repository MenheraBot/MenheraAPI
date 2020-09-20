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
        .setDescription("A Menhera acaba de ficar OFFLINE, vou notificar minha dona para ver isso ")
        .setFooter(moment.utc(Date.now()).format('LLLL'))
        canal.send(lux,embed)
        lux.send(`A MENHERA FICOU OFFLINE AGORA\n${moment.utc(Date.now()).format('LLLL')}`)
}
    

})

client.on("message", async message => {

    if (message.author.id !== config.id) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase();

    if(comando === "update"){
        const canal = await client.channels.cache.get('757292554445127722')
    
        const embed = new Discord.MessageEmbed()
        .setTitle("🟡 | ATUALIZAÇÃO")
        .setColor("#ffe752")
        .setDescription("A Menhera vai reiniciar para aplicar uma atualização\nCheque <#730904048475046069> para ver as novidades")
        .setTimestamp()
        canal.send(embed)
    }

});

client.login(config.token);