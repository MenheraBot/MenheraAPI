const express = require("express")
const router = express.Router()
const make_request = require("../util/sendMessage")
const { exec } = require('child_process');

router.post('/', (req, res, next) => {
    try {
        const command = `cd ../main; git fetch --all; git reset --hard origin/master;`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.log(`[API SERVER ERROR]`)
                res.send(`error: ${error.message}`).status(500);
                make_request.github(500, error.message)
                return;
            }
            res.sendStatus(200);
            make_request.github(200, "Deploy finalizado com sucesso")
        });
    } catch (err) {
        console.log(`[API SERVER ERROR]`)
        res.sendStatus(500);
        make_request.github(500, err.message)
    }
})

module.exports = router;