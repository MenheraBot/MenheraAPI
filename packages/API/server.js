const { superSecretRoute, port } = require('./config.json')
const express = require('express')
const path = require("path")
const app = express()
const server = require('http').createServer(app)
const cors = require("cors")
const bodyParser = require("body-parser")

const deployRoutes = require("./routes/deploy");
const QUATROCENTOSEQUATRO = require("./routes/404")
const menheraStats = require("./routes/statsManager")
const menheraActivity = require("./routes/activityManager")
const menheraMessages = require("./routes/clientMessages")
const menheraLogs = require("./routes/logsManager")

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

app.use(superSecretRoute, deployRoutes)

app.use('/api/comunicate', menheraMessages)
app.use('/api/stats', menheraStats)
app.use('/api/activity', menheraActivity)
app.use('/api/logs', menheraLogs)
app.use('/*', QUATROCENTOSEQUATRO)

server.listen(port, function () {
  console.log('[API] Server started on port ' + port)
});