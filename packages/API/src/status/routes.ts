import { Router } from 'express';
import ShardController from './controllers/shard.controller';
import isAuthorized from '../api/middlewares/isAuthorized';

const router = Router();

router.get('/shard', ShardController.getShardStatus);
router.put('/shard/:id', isAuthorized, ShardController.updateShardStatus);

export default router;
