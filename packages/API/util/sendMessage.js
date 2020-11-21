const { MessageEmbed } = require("discord.js")
const request = require("request")
const { webhook_token_status, webhook_ID_status, webhook_ID_github, webhook_token_github } = require("../config.json")

module.exports.status = async (embed) => {
    request.post(`https://discord.com/api/webhooks/${webhook_ID_status}/${webhook_token_status}`, {
        json: {
            embeds: [embed]
        }
    })
}

module.exports.github = async (status, message) => {

    let embed = new MessageEmbed()
        .setTitle(status)
        .setDescription(message)
        .setThumbnail('https://i.imgur.com/t94XkgG.png')
        .setColor('#17ec39')
        .setTimestamp()

    if (status > 399) embed.setColor('#ff0000').setThumbnail('https://cdn140.picsart.com/283880390029211.png?type=webp&to=min&r=640')

    request.post(`https://discord.com/api/webhooks/${webhook_ID_github}/${webhook_token_github}`, {
        json: {
            embeds: [embed]
        }
    })

}