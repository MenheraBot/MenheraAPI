const express = require("express");
const file = require("../util/variables");
const MenheraStats = new file();
const router = express.Router()

router.get('/commands', (req, res) => {
    res.json({"commands": MenheraStats.getCommands()})
})

router.post('/commands', (req, res) => {
    MenheraStats.setCommands(1)
    res.send(200);
 })

 router.post('/commands/clear', (req, res) => {
    MenheraStats.clearCommands()
    res.send(200);
 })


module.exports = router;