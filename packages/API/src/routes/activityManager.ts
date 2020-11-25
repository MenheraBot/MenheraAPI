import express from 'express'
import MenheraActivity from '../util/menheraActivity'
const router = express.Router()


router.get('/', (req, res) => {
  const activity = MenheraActivity.getInstance().getRandomActivity()
  res.send(activity)
})

router.get('/all', (req, res) => {
  const activities = MenheraActivity.getInstance().getAllActivities()
  res.send(activities)
})

router.post('/', (req, res) => {
    const token = req.headers.token

    if (!token || token !== api_TOKEN) {
        return res.status(403).send({ message: "Only the Menhera Client can acess that!" })
    }

    try {
        const acceptedTypes = ['WATCHING', 'PLAYING', 'LISTENING', 'STREAMING'];
        const { type, name } = req.body

        if (type === undefined || name === undefined) throw "O conteúdo do request é inválido!";
        if (!acceptedTypes.includes(type)) throw "Este tipo não existe"

        MenheraActivity.getInstance().addActivity(name, type);
        res.status(201).send({ type, name });

    } catch (err) {
        res.status(400).send({ "message": err });
    }
})

router.delete('/', (req, res) => {

    MenheraActivity.getInstance().clearActivities();
    res.sendStatus(200);
})

router.put('/', (req, res) => {
// aaaaa

    res.sendStatus(200)
})

export default router;