const express = require("express");
const { api_TOKEN } = require("../../config.json")
const MenheraAvtivity = require("../util/menheraActivity");
const router = express.Router()

router.get('/', (req, res) => {

    const atividade = MenheraAvtivity.getRandomActivity()

    res.send(atividade)
})

router.post('/', (req, res) => {
    const token = req.headers.token

    if (!token || token !== api_TOKEN) return res.status(403).send({ message: "Only the Menhera Client can acess that!" })

    try {
        const acceptedTypes = ['WATCHING', 'PLAYING', 'LISTENING', 'STREAMING'];
        const { type, name } = req.body

        if (type === undefined || name === undefined) throw "O conteúdo do request é inválido!"
        if (!acceptedTypes.includes(type)) throw "Este tipo não existe"

        MenheraAvtivity.addActivity(name, type)
        res.sendStatus(200);

    } catch (err) {
        res.status(400).send({ "message": err })
    }
})

router.delete('/', (req, res) => {
    const token = req.headers.token

    if (!token || token !== api_TOKEN) return res.status(403).send({ message: "Only the Menhera Client can acess that!" })

    MenheraAvtivity.clearActivities()
    res.sendStatus(200);
})

router.put('/', (req, res) => {
    const token = req.headers.token

    if (!token || token !== api_TOKEN) return res.status(403).send({ message: "Only the Menhera Client can acess that!" })

    MenheraAvtivity.resetActivities()
    res.sendStatus(200)
})

module.exports = router;