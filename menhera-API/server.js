const { superSecretRoute, port } = require('../config.json')
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const bodyParser = require("body-parser")

const deployRoutes = require("./routes/deploy");
const adminDashboard = require("./public/index")
const QUATROCENTOSEQUATRO = require("./routes/QUATROCENTOSEQUATRO")
const menheraStats = require("./routes/statsManager")
const menheraMessages = require("./routes/clientMessages")

app.use(bodyParser.json());

app.use('/', adminDashboard)
app.use(superSecretRoute, deployRoutes)
app.use('/api/comunicate', menheraMessages)
app.use('/api/stats', menheraStats)
app.use('/*', QUATROCENTOSEQUATRO)

server.listen(port, function () {
    console.log('[API] Server started')
});

