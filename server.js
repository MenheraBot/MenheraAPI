const config = require('./config.json')
const { exec } = require('child_process');
const express = require('express')
const app = express()
const server = require('http').createServer(app)

module.exports = class Server {
    start() {

        app.get('/', (req, res) => {
            res.sendStatus(405);
            console.log("[SERVER] Get Request")
        })

        app.post(config.superSecretRoute, (req, res) => {
            try {
                const command = `cd ../main; git fetch --all; git checkout -b backup-master; git reset --hard origin/master;`;
        
                exec(command, (error, stdout, stderr) => {
                    if (error) {
                        console.log(`[SERVER ERROR] Error: ${error.message}`)
                        res.send(`error: ${error.message}`).status(500);
                        return;
                    }
                    if (stderr) {
                        console.log(`[SERVER ERROR] StdErr: ${error.message}`)
                        res.send(`stderr: ${stderr}`).status(500);
                        return;
                    }
                    console.log("[SERVER] Requisição concluida")
                    res.sendStatus(200);
                });
            } catch (err) {
                console.log(`[SERVER ERROR] Error: ${err.message}`)
                res.sendStatus(500);
            }
        })

        server.listen(config.port, function () {
            console.log('[SERVER] Server started')
        });
    }
}