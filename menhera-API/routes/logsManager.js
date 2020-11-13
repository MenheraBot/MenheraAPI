const express = require("express");
const { api_TOKEN } = require("../../config.json");
const MenheraLogs = require("../util/variables");
const router = express.Router()

router.get('/', (req, res) => {

    const logs = MenheraLogs.getLogs()

    res.send(logs)
})

router.post('/', (req, res) => { 
    const token = req.headers.token
    const body = req.body.info

    if (!token || token !== api_TOKEN) return res.status(403).send({message: "Only the Menhera Client can acess that!"})

     Menhera.setLogs(body)
     res.sendStatus(200);
})

module.exports = router;