import { Pool } from 'pg';
import logger from '@menhera-tools/logger';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

pool.on('error', err => logger.error(err.message));

export default pool;
