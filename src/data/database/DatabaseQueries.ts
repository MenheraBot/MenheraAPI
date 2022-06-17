/* eslint-disable camelcase */
import { hunts } from '@prisma/client';
import {
  AllNulable,
  BlackJackStats,
  CoinflipStats,
  commandInterface,
  HuntTypes,
  RouletteStats,
  userInterface,
} from '../util/types';
import Prisma from './Connection';

export const ensureCommand = async (commandsName: string): Promise<number> => {
  const command = await Prisma.cmds.findFirst({ where: { name: commandsName } });

  if (command) return command.id;

  const res = await Prisma.cmds.create({ data: { name: commandsName } });
  return res.id;
};

export const ensureUser = async (userId: string): Promise<string> => {
  const user = await Prisma.users.findUnique({ where: { id: userId } });

  if (user) return user.id;

  const res = await Prisma.users.create({ data: { id: userId } });
  return res.id;
};

const incrementUsages = async (userId: string, commandId: number): Promise<void> => {
  await Prisma.$transaction([
    Prisma.users.update({ where: { id: userId }, data: { uses: { increment: 1 } } }),
    Prisma.cmds.update({ where: { id: commandId }, data: { usages: { increment: 1 } } }),
  ]);
};

export const getTopCommands = async (): Promise<commandInterface[]> => {
  return Prisma.cmds.findMany({
    orderBy: { usages: 'desc' },
    take: 10,
    select: { name: true, usages: true },
  });
};

export const getTopUsers = async (): Promise<userInterface[]> => {
  return Prisma.users.findMany({
    orderBy: { uses: 'desc' },
    take: 10,
    select: { id: true, uses: true }, // ok
  });
};

export const createCommandExecution = async (
  userId: string,
  guildId: string,
  commandName: string,
  date: number,
  args: string
): Promise<void> => {
  const commandId = await ensureCommand(commandName);
  await ensureUser(userId);

  await Prisma.uses.create({
    data: { guild_id: guildId, args, user_id: userId, cmd_id: commandId, date },
  });

  await incrementUsages(userId, commandId);
};

export const getCoinflipStats = async (
  userId: string
): Promise<AllNulable<CoinflipStats> | null> => {
  await ensureUser(userId);
  const result = await Prisma.users.findUnique({
    where: { id: userId },
    select: { cf_wins: true, cf_loses: true, cf_win_money: true, cf_lose_money: true },
  });

  return result;
};

export const getBichoStats = async (userId: string): Promise<AllNulable<RouletteStats> | null> => {
  const result = await Prisma.bichouser.findUnique({
    where: { user_id: userId },
    select: {
      earn_money: true,
      lost_games: true,
      lost_money: true,
      won_games: true,
      user_id: true,
    },
  });

  if (!result) return null;

  return result;
};

export const getBlackJackStats = async (
  userId: string
): Promise<AllNulable<BlackJackStats> | null> => {
  await ensureUser(userId);
  const result = await Prisma.users.findUnique({
    where: { id: userId },
    select: { bj_wins: true, bj_loses: true, bj_win_money: true, bj_lose_money: true },
  });

  return result;
};

export const postBlackJackGame = async (
  userId: string,
  didWin: boolean,
  betValue: number
): Promise<void> => {
  await ensureUser(userId);

  if (didWin)
    await Prisma.users.update({
      where: { id: userId },
      data: { bj_wins: { increment: 1 }, bj_win_money: { increment: betValue } },
    });
  else
    await Prisma.users.update({
      where: { id: userId },
      data: { bj_loses: { increment: 1 }, bj_lose_money: { increment: betValue } },
    });
};

export const postCoinflip = async (
  winnerId: string,
  loserId: string,
  value: number
): Promise<void> => {
  await Promise.all([ensureUser(winnerId), ensureUser(loserId)]);

  await Prisma.$transaction([
    Prisma.users.update({
      where: { id: winnerId },
      data: { cf_wins: { increment: 1 }, cf_win_money: { increment: value } },
    }),
    Prisma.users.update({
      where: { id: loserId },
      data: { cf_loses: { increment: 1 }, cf_lose_money: { increment: value } },
    }),
  ]);
};

export const postHunt = async (
  userId: string,
  huntType: HuntTypes,
  value: number,
  success: number,
  tries: number
): Promise<void> => {
  await ensureUser(userId);

  await Prisma.hunts.upsert({
    where: { user_id: userId },
    update: {
      [`${huntType}_hunted`]: { increment: value },
      [`${huntType}_tries`]: { increment: tries },
      [`${huntType}_success`]: { increment: success },
    },
    create: { user_id: userId },
  });
};

export const updateUserBichoStatus = async (
  userId: string,
  betValue: number,
  profit: number,
  didWin: boolean
): Promise<void> => {
  const winOrLoseGame = didWin ? 'won' : 'lost';
  const winOrLoseMoney = didWin ? 'earn' : 'lost';

  await Prisma.bichouser.upsert({
    where: { user_id: userId },
    update: {
      [`${winOrLoseMoney}_money`]: { increment: didWin ? profit : betValue },
      [`${winOrLoseGame}_games`]: { increment: 1 },
    },
    create: {
      [`${winOrLoseMoney}_money`]: didWin ? profit : betValue,
      [`${winOrLoseGame}_games`]: 1,
      user_id: userId,
    },
  });
};

export const getUserHuntData = async (userId: string): Promise<hunts | null> => {
  return Prisma.hunts.findUnique({ where: { user_id: userId } });
};

export async function getInactiveUsersLastCommand(
  users: string[] = []
): Promise<{ user: string; date: number }[]> {
  const results =
    (await Prisma.$queryRaw`SELECT lc.user_id, lc.date FROM uses lc LEFT JOIN uses nc ON lc.user_id = nc.user_id AND lc.date > nc.date WHERE (nc.date IS NULL) AND (lc.date < ${
      Date.now() - 604800000
    }) AND (lc.user_id IN (${users})) ORDER BY lc.date DESC`) as { user: string; date: number }[];

  return results;
}

export const getUserCommandsUsesCount = async (
  userId: string
): Promise<{ count: number } | null> => {
  const commands = await Prisma.users.findUnique({
    where: { id: userId },
    select: { uses: true },
  });

  if (!commands) return null;

  return { count: commands.uses ?? 0 };
};

export const getUserTopCommandsUsed = async (
  userId: string
): Promise<{ name: string; count: number }[]> => {
  const results =
    await Prisma.$queryRaw`SELECT cmds.name, COUNT(cmds.name) FROM uses INNER JOIN cmds ON uses.cmd_id = cmds.id WHERE user_id = ${userId} GROUP BY cmds.name ORDER BY count DESC LIMIT 10`;
  return results as { name: string; count: number }[];
};

export const updateUserRouletteStatus = async (
  userId: string,
  betValue: number,
  profit: number,
  didWin: boolean
): Promise<void> => {
  const winOrLoseGame = didWin ? 'won' : 'lost';
  const winOrLoseMoney = didWin ? 'earn' : 'lost';

  await Prisma.roletauser.upsert({
    where: { user_id: userId },
    update: {
      [`${winOrLoseMoney}_money`]: { increment: didWin ? profit : betValue },
      [`${winOrLoseGame}_games`]: { increment: 1 },
    },
    create: {
      [`${winOrLoseMoney}_money`]: didWin ? profit : betValue,
      [`${winOrLoseGame}_games`]: 1,
      user_id: userId,
    },
  });
};

export const createRouletteGame = async (
  userId: string,
  betValue: number,
  profit: number,
  didWin: boolean,
  betType: string,
  selectedValues: string
): Promise<void> => {
  await Promise.all([
    ensureUser(userId),
    updateUserRouletteStatus(userId, betValue, profit, didWin),
    Prisma.roulette.create({
      data: {
        user_id: userId,
        bet_value: betValue,
        didwin: didWin,
        bet_type: betType,
        selected_values: selectedValues,
        profit,
      },
    }),
  ]);
};

export const getRouletteStatus = async (
  userId: string
): Promise<AllNulable<RouletteStats> | null> => {
  const result = await Prisma.roletauser.findUnique({
    where: { user_id: userId },
    select: {
      earn_money: true,
      lost_games: true,
      lost_money: true,
      won_games: true,
      user_id: true,
    },
  });

  if (!result) return null;

  return result;
};

export const getTopBlackjack = async (
  skip: number,
  bannedUsers: string[],
  type: 'money' | 'wins'
): Promise<BlackJackStats[]> => {
  const toOrderBy = type === 'money' ? 'bj_win_money' : 'bj_wins';

  const result = await Prisma.users.findMany({
    take: 10,
    skip,
    where: { id: { notIn: bannedUsers } },
    orderBy: { [toOrderBy]: 'desc' },
    select: { bj_wins: true, bj_win_money: true, bj_loses: true, bj_lose_money: true, id: true },
  });

  return result;
};

export const getTopCoinflip = async (
  skip: number,
  bannedUsers: string[],
  type: 'money' | 'wins'
): Promise<CoinflipStats[]> => {
  const toOrderBy = type === 'money' ? 'cf_win_money' : 'cf_wins';

  const result = await Prisma.users.findMany({
    take: 10,
    skip,
    where: { id: { notIn: bannedUsers } },
    orderBy: { [toOrderBy]: 'desc' },
    select: { cf_wins: true, cf_win_money: true, cf_loses: true, cf_lose_money: true, id: true },
  });

  return result;
};

export const getTopHunt = async (
  skip: number,
  bannedUsers: string[],
  huntType: HuntTypes,
  type: 'success' | 'hunted' | 'tries'
): Promise<unknown[]> => {
  const result = await Prisma.hunts.findMany({
    take: 10,
    skip,
    where: { user_id: { notIn: bannedUsers } },
    orderBy: { [`${huntType}_${type}`]: 'desc' },
    select: {
      [`${huntType}_success`]: true,
      [`${huntType}_tries`]: true,
      [`${huntType}_hunted`]: true,
      user_id: true,
    },
  });

  return result;
};

export const getTopRoulette = async (
  skip: number,
  bannedUsers: string[],
  type: 'wins' | 'money'
): Promise<RouletteStats[]> => {
  const toOrderBy = type === 'money' ? 'earn_money' : 'won_games';

  const result = await Prisma.roletauser.findMany({
    take: 10,
    skip,
    where: { user_id: { notIn: bannedUsers } },
    orderBy: { [toOrderBy]: 'desc' },
    select: {
      earn_money: true,
      lost_games: true,
      lost_money: true,
      won_games: true,
      user_id: true,
    },
  });

  return result;
};

export const getTopBicho = async (
  skip: number,
  bannedUsers: string[],
  type: 'wins' | 'money'
): Promise<RouletteStats[]> => {
  const toOrderBy = type === 'money' ? 'earn_money' : 'won_games';

  const result = await Prisma.bichouser.findMany({
    take: 10,
    skip,
    where: { user_id: { notIn: bannedUsers } },
    orderBy: { [toOrderBy]: 'desc' },
    select: {
      earn_money: true,
      lost_games: true,
      lost_money: true,
      won_games: true,
      user_id: true,
    },
  });

  return result;
};
