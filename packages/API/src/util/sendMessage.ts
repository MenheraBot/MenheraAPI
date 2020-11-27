import { MessageEmbed } from 'discord.js';
import request from 'request';

export async function status(embed: MessageEmbed) {
  request.post(`https://discord.com/api/webhooks/${process.env.WEBHOOK_ID_STATUS}/${process.env.WEBHOOK_TOKEN_STATUS}`, {
    json: {
      embeds: [embed],
    },
  });
}

export async function github(stats: number, message: string) {
  const embed = new MessageEmbed()
    .setTitle(stats)
    .setDescription(message)
    .setThumbnail('https://i.imgur.com/t94XkgG.png')
    .setColor('#17ec39')
    .setTimestamp();

  if (stats > 399) embed.setColor('#ff0000').setThumbnail('https://cdn140.picsart.com/283880390029211.png?type=webp&to=min&r=640');

  request.post(`https://discord.com/api/webhooks/${process.env.WEBHOOK_ID_GITHUB}/${process.env.WEBHOOK_TOKEN_GITHUB}`, {
    json: {
      embeds: [embed],
    },
  });
}
