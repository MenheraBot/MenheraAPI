/* eslint-disable camelcase */
import pool from './pool';

interface commandInterface {
  name: string;
  usages: number;
}

interface CoinflipStats {
  cf_wins: number;
  cf_loses: number;
  cf_win_money: number;
  cf_lose_money: number;
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

async function ensureUser(user: string): Promise<string> {
  const hasUser = await pool.query('SELECT id FROM users WHERE id = $1', [user]);

  if (hasUser.rowCount === 0) {
    const userId = await pool.query('INSERT INTO users (id) VALUES ($1) RETURNING id', [user]);
    return userId.rows[0].id;
  }
  return hasUser.rows[0].id;
}

async function incrementUsages(user: string, command: number): Promise<void> {
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
  data: number,
  args: string
): Promise<void> {
  const userIdInDatabase = await ensureUser(userId);
  await pool.query(
    'INSERT INTO uses (user_id, cmd_id, guild_id, date, args) VALUES ($1,$2,$3,$4, $5)',
    [userIdInDatabase, commandId, guildId, data, args]
  );
  incrementUsages(userIdInDatabase, commandId);
}

export async function getCoinflipStats(userId: string): Promise<CoinflipStats> {
  const userIdInDatabase = await ensureUser(userId);
  const result = await pool.query(
    'SELECT cf_wins, cf_loses, cf_win_money, cf_lose_money FROM users WHERE id = $1',
    [userIdInDatabase]
  );
  return result.rows[0];
}

export async function postRpgResult(userId: string, userClass: string, userLevel: number, dungeonLevel: number, death: boolean, date: number):Promise<void> {
const userIdInDatabase = await ensureUser(userId);
await pool.query('INSERT INTO rpg (user_id, user_class, user_level, dungeon_level, death, date) VALUES ($1, $2, $3, $4, $5, $6)', [userIdInDatabase, userClass, userLevel, dungeonLevel, death, date])
}

async function updateCoinflipUserStats(
  winnerId: string,
  loserId: string,
  value: number
): Promise<void> {
  await pool.query(
    'UPDATE users SET cf_wins = cf_wins + 1, cf_win_money = cf_win_money + $1 WHERE id = $2',
    [value, winnerId]
  );
  await pool.query(
    'UPDATE users SET cf_loses = cf_loses + 1, cf_lose_money = cf_lose_money + $1 WHERE id = $2',
    [value, loserId]
  );
}

export async function postCoinflip(
  winnerId: string,
  loserId: string,
  betValue: number,
  date: number
): Promise<boolean> {
  const winnerIdInDatabase = await ensureUser(winnerId);
  const loserIdInDatabase = await ensureUser(loserId);
  await updateCoinflipUserStats(winnerIdInDatabase, loserIdInDatabase, betValue);

  const result = await pool.query(
    'INSERT INTO coinflip (winner, loser, value, date) VALUES ($1, $2, $3, $4) RETURNING id',
    [winnerIdInDatabase, loserIdInDatabase, betValue, date]
  );
  if (result.rows[0].id) return true;
  return false;
}
