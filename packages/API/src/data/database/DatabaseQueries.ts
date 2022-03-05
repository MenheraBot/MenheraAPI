/* eslint-disable camelcase */
import {
  BichoBetType,
  BlackJackStats,
  CoinflipStats,
  commandInterface,
  HuntStats,
  usagesInterface,
  userInterface,
} from '../util/types';
import pool from './Pool';

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

export async function registerBichoBet(
  userId: string,
  value: number,
  betType: BichoBetType,
  betSelection: string
): Promise<number> {
  const userIdInDatabase = await ensureUser(userId);
  const result = await pool.query(
    'INSERT INTO bicho (user_id, value, bet_type, bet_selection, date) VALUES ($1,$2,$3,$4,$5) RETURNING game_id',
    [userIdInDatabase, value, betType, betSelection, Date.now()]
  );

  return result.rows[0].game_id;
}

export async function makeUserWinBicho(gameId: number): Promise<void> {
  await pool.query('UPDATE bicho SET didWin = true WHERE game_id = $1', [gameId]);
}

export async function addCommand(
  userId: string,
  guildId: string,
  commandName: string,
  data: number,
  args: string
): Promise<void> {
  const commandId = await ensureCommand(commandName);
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

export async function getBlackJackStats(userId: string): Promise<BlackJackStats> {
  const userIdInDatabase = await ensureUser(userId);
  const result = await pool.query(
    'SELECT bj_wins, bj_loses, bj_win_money, bj_lose_money FROM users WHERE id = $1',
    [userIdInDatabase]
  );
  return result.rows[0];
}

export async function postBlackJackGame(
  userId: string,
  didWin: boolean,
  betValue: number
): Promise<void> {
  const userIdInDatabase = await ensureUser(userId);

  if (didWin)
    await pool.query(
      'UPDATE users SET bj_wins = bj_wins + 1, bj_win_money = bj_win_money + $1 WHERE id = $2',
      [betValue, userIdInDatabase]
    );
  else
    await pool.query(
      'UPDATE users SET bj_loses = bj_loses + 1, bj_lose_money = bj_lose_money + $1 WHERE id = $2',
      [betValue, userIdInDatabase]
    );
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

async function ensureHunt(userId: string): Promise<true> {
  await ensureUser(userId);
  const has = await pool.query('SELECT user_id FROM hunts WHERE user_id = $1', [userId]);
  if (has.rows[0]?.user_id) return true;

  await pool.query('INSERT INTO hunts (user_id) VALUES ($1)', [userId]);
  return true;
}

export async function postHunt(
  userId: string,
  huntType: string,
  value: number,
  success: number,
  tries: number
): Promise<void> {
  await ensureHunt(userId);

  await pool.query(
    `UPDATE hunts SET ${huntType}_tries = ${huntType}_tries + ${tries}, ${huntType}_success = ${huntType}_success + ${success}, ${huntType}_hunted = ${huntType}_hunted + ${value} WHERE user_id = $1`,
    [userId]
  );
}

export async function getUserHuntData(userId: string): Promise<HuntStats> {
  return (await pool.query('SELECT * FROM hunts WHERE user_id = $1', [userId])).rows[0];
}

export async function getInactiveUsersLastCommand(
  users: string[] = []
): Promise<{ user: string; date: number }[]> {
  const results = await pool.query(
    'SELECT lc.user_id, lc.date FROM uses lc LEFT JOIN uses nc ON lc.user_id = nc.user_id AND lc.date > nc.date WHERE (nc.date IS NULL) AND (lc.date < $1) AND (lc.user_id IN ($2)) ORDER BY lc.date DESC',
    [Date.now() - 604800000, users]
  );

  return results.rows;
}

export async function getUserCommandsUsesCount(userId: string): Promise<{ count: number } | null> {
  const commandsExecuted = await pool.query('SELECT uses AS count FROM users WHERE id = $1', [
    userId,
  ]);

  if (!commandsExecuted.rows[0]) return null;

  return commandsExecuted.rows[0];
}

export async function getUserTopCommandsUsed(userId: number): Promise<unknown[]> {
  const allCommands = await pool.query(
    'SELECT cmds.name, COUNT(cmds.name) FROM uses INNER JOIN cmds ON uses.cmd_id = cmds.id WHERE user_id = $1 GROUP BY cmds.name ORDER BY count DESC LIMIT 10',
    [userId]
  );

  return allCommands.rows;
}
