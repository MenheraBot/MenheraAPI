const express = require("express");
const MenheraStats = require("../util/variables");
const router = express.Router()

router.get('/commands', (req, res) => {
    MenheraStats._commands += 1
    const comandos = MenheraStats.getCommands()
    res.json({ "lenght": comandos.lenght, "commands": comandos.commands })
})

router.post('/commands', (req, res) => {

    try {
        const authorName = req.body.authorName
        const authorId = req.body.authorId
        const guildName = req.body.guildName
        const guildId = req.body.guildId
        const commandName = req.body.commandName
        const data = req.body.data

        if (authorName === undefined || authorId === undefined || guildName === undefined || guildId === undefined || commandName === undefined || data === undefined) throw "O conteúdo do request é inválido!"

        MenheraStats.setCommands(authorName, authorId, guildName, guildId, commandName, data)
        res.sendStatus(200);

    } catch (err) {
        res.status(400).send({ "message": err })
    }
})

router.post('/commands/clear', (req, res) => {
    MenheraStats.clearCommands()
    res.sendStatus(200);
})

module.exports = router;