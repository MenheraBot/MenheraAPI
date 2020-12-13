import pool from './pool';

export async function ensureCommand(commandName: string): Promise<number> {
  const command = await pool.query('SELECT (id) FROM cmds WHERE name = $1', [commandName]);

  if (command.rowCount === 0) {
    const commandId = await pool.query('INSERT INTO cmds (name) VALUES ($1) RETURNING id', [
      commandName,
    ]);
    return commandId.rows[0].id;
  }
  return command.rows[0].id;
}

async function ensureUser(user: string): Promise<number> {
  const hasUser = await pool.query('SELECT id FROM users WHERE id = $1', [user]);

  if (hasUser.rowCount === 0) {
    const userId = await pool.query('INSERT INTO users (id) VALUES ($1) RETURNING id', [user]);
    return userId.rows[0].id;
  }
  return hasUser.rows[0].id;
}

async function incrementUsages(user: number, command: number): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    await client.query('UPDATE users SET uses = uses + 1 WHERE id = $1', [user]);
    await client.query('UPDATE cmds SET usages = usages + 1 WHERE id = $1', [command]);

    await client.query('COMMIT');
  } catch {
    await client.query('ROLLBACK');
  } finally {
    client.release();
  }
}

export async function addCommand(
  userId: string,
  guildId: string,
  commandId: number,
  data: number
): Promise<void> {
  const userIdInDatabase = await ensureUser(userId);
  await pool.query('INSERT INTO uses (user_id, cmd_id, guild_id, date) VALUES ($1,$2,$3,$4)', [
    userIdInDatabase,
    commandId,
    guildId,
    data,
  ]);
  incrementUsages(userIdInDatabase, commandId);
}
