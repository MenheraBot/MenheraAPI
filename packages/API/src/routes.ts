import { Router } from 'express'
import ActivityController from "./controllers/ActivityController"
import isAuthorized from './middlewares/isAuthorized'

const router = Router();

router.get('/api/activity/random', ActivityController.random)
router.get('/api/activity', ActivityController.all)
router.post('/api/activity', isAuthorized, ActivityController.add)
router.put('/api/activity/reset', isAuthorized, ActivityController.reset)
router.delete('/api/activity/clear', isAuthorized, ActivityController.clear)

export default router