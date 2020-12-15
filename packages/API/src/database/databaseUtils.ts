import pool from './pool';

interface commandInterface {
  name: string;
  usages: number;
}

interface userInterface {
  id: string;
  uses: number;
}

interface usagesInterface {
  command: commandInterface;
  user: userInterface;
}

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
  await pool.query('UPDATE users SET uses = uses + 1 WHERE id = $1', [user]);
  await pool.query('UPDATE cmds SET usages = usages + 1 WHERE id = $1', [command]);
}

export async function getMostUserAndCommand(): Promise<usagesInterface> {
  const mostCommandUsed = await pool.query(
    'SELECT name, usages FROM cmds ORDER BY usages DESC LIMIT 1'
  );
  const mostUserCommand = await pool.query('SELECT * FROM users ORDER BY uses DESC LIMIT 1');
  const result = {
    command: mostCommandUsed.rows[0],
    user: mostUserCommand.rows[0],
  };
  return result;
}

export async function getTopCommands(): Promise<Array<commandInterface>> {
  const result = await pool.query('SELECT name, usages FROM cmds ORDER BY usages DESC LIMIT 10');
  return result.rows;
}

export async function getTopUsers(): Promise<Array<userInterface>> {
  const result = await pool.query('SELECT id, uses FROM users ORDER BY uses DESC LIMIT 10');
  return result.rows;
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
