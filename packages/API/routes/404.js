const express = require("express")

const router = express.Router()

router.get('/', (req, res) => {
    res.status(404).send(`<h1 style='font-size:3000%; color:red'><center>404</center></h1>`)
})

module.exports = router;