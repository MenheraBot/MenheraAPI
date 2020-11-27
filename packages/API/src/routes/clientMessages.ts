import express from 'express';
import { MessageEmbed } from 'discord.js';
import { status } from '../util/sendMessage';
import isAuthorized from '../middlewares/isAuthorized';

const router = express.Router();

router.post('/ready', isAuthorized, (req, res) => {
  const embed = new MessageEmbed()
    .setTitle('Menhera is ON')
    .setDescription('Menhera voltou de férias, e já está online respondendo comandos!')
    .setColor('#1cf313')
    .setTimestamp();

  status(embed);
  return res.sendStatus(200);
});

router.post('/down', isAuthorized, (req, res) => {
  const embed = new MessageEmbed()
    .setTitle('DOWN!')
    .setDescription('ESSA NÃO!!!\nMenhera foi de base!')
    .setColor('#fd0000')
    .setTimestamp();

  status(embed);
  return res.sendStatus(200);
});

router.post('/shard/ready', isAuthorized, (req, res) => {
  const { shard } = req.body;

  const embed = new MessageEmbed()
    .setTitle('Shard On!')
    .setDescription(`O shard **${shard}** já está na batalha contra os Deuses`)
    .setColor('#df96e6')
    .setTimestamp();

  status(embed);
  return res.sendStatus(200);
});

router.post('/shard/disconnect', isAuthorized, (req, res) => {
  const { shard } = req.body;

  const embed = new MessageEmbed()
    .setTitle('Quando você voltar, eu vou estar lá')
    .setDescription(`O shard **${shard}** foi de base`)
    .setColor('#91a8a8')
    .setTimestamp();

  status(embed);
  return res.sendStatus(200);
});

router.post('/shard/reconnecting', isAuthorized, (req, res) => {
  const { shard } = req.body;

  const embed = new MessageEmbed()
    .setTitle('Achou que eu tava brincando?')
    .setDescription(`O shard **${shard}** ta se recuperando dos danos, e voltando à batalha`)
    .setColor('#91a8a8')
    .setTimestamp();

  status(embed);
  return res.sendStatus(200);
});

export default router;
