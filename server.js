const config = require('./config.json')
const { exec } = require('child_process');
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const { MessageEmbed } = require("discord.js");

module.exports = class Server {
    constructor(client) {
        this.client = client
    }
    start() {
        app.get('/', (req, res) => {
            res.sendStatus(405);
            console.log("[SERVER] Get Request")
        })

        app.post(config.superSecretRoute, (req, res) => {
            this.startMessage()
            try {
                const command = `cd ../main; git fetch --all; git reset --hard origin/master;`;

                exec(command, (error, stdout, stderr) => {
                    if (error) {
                        console.log(`[SERVER ERROR]`)
                        res.send(`error: ${error.message}`).status(500);
                        this.errorMessage(error)
                        return;
                    }
                    console.log("[SERVER] Requisição concluida")
                    res.sendStatus(200);
                    this.successMessage()
                });
            } catch (err) {
                console.log(`[SERVER ERROR]`)
                res.sendStatus(500);
                this.errorMessage(err)
            }
        })

        server.listen(config.port, function () {
            console.log('[SERVER] Server started')
        });
    }
    async startMessage() {
        this.client.channels.cache.get('744036370359648397').send("**[POST]** Start Deploying <a:loading:768860935627472946>")
    }
    async errorMessage(err) {
        const canal = this.client.channels.cache.get('744036370359648397')
        const fetched = await canal.messages.fetch({ limit: 100 })
        let lastMessage = fetched.first();
        const tempo = Date.now() - lastMessage.createdTimestamp
        let filtrado = fetched.filter(f => f.author.id == this.client.user.id && f.content == "**[POST]** Start Deploying <a:loading:768860935627472946>")
        filtrado.forEach(msg => {
            msg.delete({ timeout: 150 })
        })
        const embed = new MessageEmbed()
            .setTitle("Erro no Deploy! (HTTP 500)")
            .setColor('#910909')
            .setDescription(err.message)
            .setFooter(`${tempo}ms`)
            .setThumbnail('https://cdn140.picsart.com/283880390029211.png?type=webp&to=min&r=640')
        canal.send(embed)
    }
    async successMessage() {
        const canal = this.client.channels.cache.get('744036370359648397')
        const fetched = await canal.messages.fetch({ limit: 100 })
        let lastMessage = fetched.first();
        const tempo = Date.now() - lastMessage.createdTimestamp
        let filtrado = fetched.filter(f => f.author.id == this.client.user.id && f.content == "**[POST]** Start Deploying <a:loading:768860935627472946>")
        filtrado.forEach(msg => {
            msg.delete({ timeout: 150 })
        })
        const embed = new MessageEmbed()
            .setTitle("Sucesso! (HTTP 200)")
            .setColor('#17ec39')
            .setDescription(`Deploy finalizado em **${tempo}ms**`)
            .setThumbnail('https://i.imgur.com/t94XkgG.png')
        canal.send(embed)
    }
}