const config = require('../config.json')
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const bodyParser = require("body-parser")

const deployRoutes = require("./routes/deploy");
const QUATROCENTOSEQUATRO = require("./routes/QUATROCENTOSEQUATRO")
const menheraMessages = require("./routes/clientMessages");

app.use(bodyParser.json());

app.use(config.superSecretRoute, deployRoutes)
app.use('/api/comunicate', menheraMessages)
app.use('/*', QUATROCENTOSEQUATRO)

server.listen(config.port, function () {
    console.log('[API] Server started')
});

