import { Redis } from 'ioredis';
// eslint-disable-next-line import/no-cycle
import { createUsers, findUsers } from './DatabaseQueries';

const redis = new Redis({
  db: 3,
  commandTimeout: 1500,
  path: process.env.REDIS_PATH,
  host: process.env.REDIS_URL,
});

const ensureUsers = async (...userId: string[]): Promise<void> => {
  const users = await Promise.all(
    userId.map(id => redis.sismember('users', id).then(a => ({ id, inRedis: a === 1 })))
  );

  const notInRedis = users.reduce<string[]>((p, c) => (c.inRedis ? p : [...p, c.id]), []);

  if (notInRedis.length === 0) return;

  const fromDb = await findUsers(notInRedis);

  if (fromDb.length > 0) await redis.sadd('users', fromDb);

  const notInDb = notInRedis.filter(a => !fromDb.includes(a));

  if (notInDb.length === 0) return;

  redis.sadd('users', notInDb);

  await createUsers(notInDb);
};

export default { ensureUsers };
