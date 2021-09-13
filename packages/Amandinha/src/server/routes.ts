import { Router } from 'express';
import DefaultController from './Controllers/DefaultController';

const router = Router();

router.post('/', DefaultController.ReceivedAction);

export default router;
