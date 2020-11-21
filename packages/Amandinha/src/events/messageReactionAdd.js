const { MessageEmbed } = require("discord.js");

module.exports = class {
    constructor(client) {
      this.client = client;
    }
  
    async run(reaction, user) {

      const message = reaction.message;
      if(message.channel.id != "723765136648830996") return;
      if(user.id != this.client.config.id) return; 

      const Handler = async () => {
        if(reaction.emoji.name == '✅'){
          const confirmedChannel = this.client.channels.cache.get('767924240552296458')
          const oldEmbed = message.embeds[0]
          const newEmbed = new MessageEmbed()
          .setDescription(oldEmbed.description)
          .setColor("#17ec39")
          .setThumbnail(oldEmbed.thumbnail.url)
          .setTitle("Sugestão aceita!")
          .setFooter(oldEmbed.footer.text)
          .setTimestamp(new Date(oldEmbed.timestamp))
          .setAuthor(oldEmbed.author.name, oldEmbed.author.iconURL);
          confirmedChannel.send(newEmbed)
          message.delete({timeout: 2500}).catch()
        }
        if(reaction.emoji.name == '❌'){
          const negatedChannel = this.client.channels.cache.get('767924268100354098')
          const oldEmbed = message.embeds[0]
          const newEmbed = new MessageEmbed()
          .setDescription(oldEmbed.description)
          .setColor("#fc0505")
          .setThumbnail(oldEmbed.thumbnail.url)
          .setTitle("Sugestão negada!")
          .setFooter(oldEmbed.footer.text)
          .setTimestamp(new Date(oldEmbed.timestamp))
          .setAuthor(oldEmbed.author.name, oldEmbed.author.iconURL);
          negatedChannel.send(newEmbed)
          message.delete({timeout: 2500}).catch()
        }
      }

      if(message.partial){
        await reaction.fetch()
        await message.fetch()
        Handler()
      } else {
        Handler()
      }
   }
}