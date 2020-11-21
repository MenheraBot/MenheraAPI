const express = require("express");
const { api_TOKEN } = require("../config.json")
const MenheraStats = require("../util/variables");
const router = express.Router()

router.get('/commands', (req, res) => {

    const comandos = MenheraStats.getCommands()
    if (req.query.cmds === "true") return res.json({ "lenght": comandos.lenght })

    res.json({ "lenght": comandos.lenght, "commands": comandos.commands })
})

router.post('/commands', (req, res) => {
    const token = req.headers.token

    if (!token || token !== api_TOKEN) return res.status(403).send({ message: "Only the Menhera Client can acess that!" })

    try {

        const { authorName, authorId, guildName, guildId, commandName, data } = req.body

        if (authorName === undefined || authorId === undefined || guildName === undefined || guildId === undefined || commandName === undefined || data === undefined) throw "O conteúdo do request é inválido!"

        MenheraStats.setCommands(authorName, authorId, guildName, guildId, commandName, data)
        res.sendStatus(200);

    } catch (err) {
        res.status(400).send({ "message": err })
    }
})

router.post('/commands/clear', (req, res) => {
    const token = req.headers.token

    if (!token || token !== api_TOKEN) return res.status(403).send({ message: "Only the Menhera Client can acess that!" })

    MenheraStats.clearCommands()
    res.sendStatus(200);
})

module.exports = router;