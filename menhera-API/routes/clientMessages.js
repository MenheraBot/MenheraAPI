const express = require("express");
const router = express.Router()
const make_request = require("../util/sendMessage")
const { MessageEmbed } = require("discord.js")

router.post('/ready', (req, res) => {
    const embed = new MessageEmbed()
        .setTitle("Menhera is ON")
        .setDescription("Menhera voltou de férias, e já está online respondendo comandos!")
        .setColor("#1cf313")
        .setTimestamp()
        
    make_request.status(embed)

})

router.post('/down', (req, res) => {

    const embed = new MessageEmbed()
        .setTitle("DOWN!")
        .setDescription("ESSA NÃO!!!\nMenhera foi de base!")
        .setColor("#fd0000")
        .setTimestamp()
        
    make_request.status(embed)
})

router.post('/shard/ready', (req, res) => {

   const shard =  req.body.shard

    const embed = new MessageEmbed()
        .setTitle("Shard On!")
        .setDescription(`O shard ${shard} já está na batalha contra os Deuses`)
        .setColor("#df96e6")
        .setTimestamp()
        
    make_request.status(embed)
})

router.post('/shard/disconnect', (req, res) => {

    const shard =  req.body.shard
 
     const embed = new MessageEmbed()
         .setTitle("Quando você voltar, eu vou estar lá")
         .setDescription(`O shard ${shard} foi de base`)
         .setColor("#91a8a8")
         .setTimestamp()
         
     make_request.status(embed)
 })

 router.post('/shard/reconnecting', (req, res) => {

    const shard =  req.body.shard
 
     const embed = new MessageEmbed()
         .setTitle("Achou que eu tava brincando?")
         .setDescription(`O shard ${shard} ta se recuperando dos danos, e voltando à batalha`)
         .setColor("#91a8a8")
         .setTimestamp()
         
     make_request.status(embed)
 })

module.exports = router;