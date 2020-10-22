const config = require('./config.json')
const { exec } = require('child_process');
const express = require('express')
const app = express()
const server = require('http').createServer(app)

module.exports = class Server {
    start() {

        app.get('/', (req, res) => {
            res.sendStatus(405);
        })

        app.post(config.superSecretRoute, (req, res) => {
            try {
                const { dir } = config.dir;
                const command = `cd ${dir}; git pull origin master;`;
        
                exec(command, (error, stdout, stderr) => {
                    if (error) {
                        res.send(`error: ${error.message}`).status(500);
                        return;
                    }
                    if (stderr) {
                        res.send(`stderr: ${stderr}`).status(500);
                        return;
                    }
                    res.sendStatus(200);
                });
            } catch (err) {
                res.sendStatus(500);
            }
        })

        server.listen(config.port, function () {
            console.log('[SERVER] Server started')
        });
    }
}