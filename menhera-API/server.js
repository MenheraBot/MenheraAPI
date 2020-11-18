const { superSecretRoute, port } = require('../config.json')
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const bodyParser = require("body-parser")

const deployRoutes = require("./routes/deploy");
const adminDashboard = require("./public/index")
const QUATROCENTOSEQUATRO = require("./routes/404")
const menheraStats = require("./routes/statsManager")
const menheraAvtivity = require("./routes/activityManager")
const menheraMessages = require("./routes/clientMessages")
const menheraLogs = require("./routes/logsManager")

app.use(bodyParser.json());

app.use('/', adminDashboard)
app.use(superSecretRoute, deployRoutes)
app.use('/api/comunicate', menheraMessages)
app.use('/api/stats', menheraStats)
app.use('/api/activity', menheraAvtivity)
app.use('/api/logs', menheraLogs)
app.use('/*', QUATROCENTOSEQUATRO)

server.listen(port, function () {
    console.log('[API] Server started')
});

