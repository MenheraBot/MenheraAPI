const express = require("express");
const { api_TOKEN } = require("../../config.json");
const MenheraLogs = require("../util/variables");
const router = express.Router()

router.get('/', (req, res) => {

    const logs = MenheraLogs.getLogs()

    res.send(logs)
})

module.exports = router;