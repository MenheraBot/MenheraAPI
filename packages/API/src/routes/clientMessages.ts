import express from 'express';
import { MessageEmbed } from 'discord.js';
import make_request from '../util/sendMessage';

const router = express.Router();

router.post('/ready', (req, res) => {
  const { token } = req.headers;

  if (!token || token !== api_TOKEN) return res.status(403).send({ message: 'Only the Menhera Client can acess that!' });

  const embed = new MessageEmbed()
    .setTitle('Menhera is ON')
    .setDescription('Menhera voltou de férias, e já está online respondendo comandos!')
    .setColor('#1cf313')
    .setTimestamp();

  make_request.status(embed);
  res.sendStatus(200);
});

router.post('/down', (req, res) => {
  const { token } = req.headers;

  if (!token || token !== api_TOKEN) return res.status(403).send({ message: 'Only the Menhera Client can acess that!' });

  const embed = new MessageEmbed()
    .setTitle('DOWN!')
    .setDescription('ESSA NÃO!!!\nMenhera foi de base!')
    .setColor('#fd0000')
    .setTimestamp();

  make_request.status(embed);
  res.sendStatus(200);
});

router.post('/shard/ready', (req, res) => {
  const { token } = req.headers;

  if (!token || token !== api_TOKEN) return res.status(403).send({ message: 'Only the Menhera Client can acess that!' });

  const { shard } = req.body;

  const embed = new MessageEmbed()
    .setTitle('Shard On!')
    .setDescription(`O shard **${shard}** já está na batalha contra os Deuses`)
    .setColor('#df96e6')
    .setTimestamp();

  make_request.status(embed);
  res.sendStatus(200);
});

router.post('/shard/disconnect', (req, res) => {
  const { token } = req.headers;

  if (!token || token !== api_TOKEN) return res.status(403).send({ message: 'Only the Menhera Client can acess that!' });

  const { shard } = req.body;

  const embed = new MessageEmbed()
    .setTitle('Quando você voltar, eu vou estar lá')
    .setDescription(`O shard **${shard}** foi de base`)
    .setColor('#91a8a8')
    .setTimestamp();

  make_request.status(embed);
  res.sendStatus(200);
});

router.post('/shard/reconnecting', (req, res) => {
  const { token } = req.headers;

  if (!token || token !== api_TOKEN) return res.status(403).send({ message: 'Only the Menhera Client can acess that!' });

  const { shard } = req.body;

  const embed = new MessageEmbed()
    .setTitle('Achou que eu tava brincando?')
    .setDescription(`O shard **${shard}** ta se recuperando dos danos, e voltando à batalha`)
    .setColor('#91a8a8')
    .setTimestamp();

  make_request.status(embed);
  res.sendStatus(200);
});

module.exports = router;
