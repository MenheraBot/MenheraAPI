import express from 'express'
import cors from "cors"
import bodyParser from "body-parser"
import Http from 'http'

const app = express()
const server = Http.createServer(app)

// ROUTES
import menheraActivity from "./routes/activityManager"
// import deployRoutes from "./routes/deploy"
// import QUATROCENTOSEQUATRO from "./routes/404"
// import menheraMessages from "./routes/clientMessages"
// import menheraLogs from "./routes/logsManager"
// import menheraStats from "./routes/statsManager"

// MIDDLEWARES
import NotFound from './middlewares/NotFound'

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(superSecretRoute, deployRoutes)

// app.use('/api/stats', menheraStats)
app.use('/api/activity', menheraActivity)
// app.use('/api/logs', menheraLogs)
// app.use('/api/comunicate', menheraMessages)
// app.use('/*', QUATROCENTOSEQUATRO)

app.use(NotFound)

server.listen(process.env.PORT, () => {
  console.log('[API] Server started on port ' + process.env.PORT)
});