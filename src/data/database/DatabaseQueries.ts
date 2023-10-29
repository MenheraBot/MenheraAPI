/* eslint-disable camelcase */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { farmuser, hunts } from './generated/client';
import { CommandCount, GamblingStats, HuntTypes, UserCount } from '../util/types';
import Prisma from './Connection';

const existingCommands = new Map<string, number>();

export const ensureCommand = async (commandsName: string): Promise<number> => {
  const fromCache = existingCommands.get(commandsName);

  if (fromCache) return fromCache;

  const command = await Prisma.cmds.findFirst({ where: { name: commandsName } });

  if (command) {
    existingCommands.set(commandsName, command.id);
    return command.id;
  }

  const res = await Prisma.cmds.create({ data: { name: commandsName } });
  existingCommands.set(commandsName, res.id);
  return res.id;
};

export const ensureUser = async (userId: string): Promise<string> => {
  const user = await Prisma.users.findUnique({ where: { id: userId }, select: { id: true } });

  if (user) return user.id;

  const res = await Prisma.users.create({ data: { id: userId } });
  return res.id;
};

const incrementUsages = async (userId: string, commandId: number): Promise<void> => {
  await Prisma.$transaction([
    Prisma.users.update({ where: { id: userId }, data: { uses: { increment: 1 } } }),
    Prisma.cmds.update({ where: { id: commandId }, data: { usages: { increment: 1 } } }),
    Prisma.usercmds.upsert({
      where: {
        user_id_cmd_id: {
          user_id: userId,
          cmd_id: commandId,
        },
      },
      update: { uses: { increment: 1 } },
      create: {
        user_id: userId,
        cmd_id: commandId,
        uses: 1,
      },
    }),
  ]);
};

export const getTopCommands = async (skip: number): Promise<CommandCount[]> =>
  Prisma.cmds
    .findMany({
      take: 10,
      skip,
      orderBy: { usages: 'desc' },
      select: { name: true, usages: true },
    })
    .then(a => a.map(b => ({ name: b.name, uses: b.usages })));

export const getTopCommandsFromUser = async (
  skip: number,
  userId: string
): Promise<CommandCount[]> =>
  Prisma.usercmds
    .findMany({
      take: 10,
      skip,
      where: { user_id: userId },
      orderBy: { uses: 'desc' },
      select: { cmd: { select: { name: true } }, uses: true },
    })
    .then(a => a.map(b => ({ name: b.cmd.name, uses: b.uses })));

export const getTopUsers = async (skip: number, bannedUsers: string[]): Promise<UserCount[]> =>
  Prisma.users.findMany({
    select: { id: true, uses: true },
    where: { id: { notIn: bannedUsers } },
    orderBy: { uses: 'desc' },
    take: 10,
    skip,
  });

export const getTopUsersFromCommand = async (
  skip: number,
  bannedUsers: string[],
  commandId: number
): Promise<Array<UserCount & { commandName: string }>> =>
  Prisma.usercmds
    .findMany({
      select: { user_id: true, uses: true, cmd: { select: { name: true } } },
      where: { cmd_id: commandId, user_id: { notIn: bannedUsers } },
      orderBy: { uses: 'desc' },
      take: 10,
      skip,
    })
    .then(a => a.map(b => ({ id: b.user_id, uses: b.uses, commandName: b.cmd.name })));

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

export const getCoinflipStats = async (userId: string): Promise<GamblingStats | null> => {
  const result = await Prisma.coinflipuser.findUnique({
    where: { user_id: userId },
  });

  if (!result) return null;

  return result;
};

export const getBichoStats = async (userId: string): Promise<GamblingStats | null> => {
  const result = await Prisma.bichouser.findUnique({
    where: { user_id: userId },
  });

  if (!result) return null;

  return result;
};

export const getBlackJackStats = async (userId: string): Promise<GamblingStats | null> => {
  const result = await Prisma.blackjackuser.findUnique({
    where: { user_id: userId },
  });

  if (!result) return null;

  return result;
};

export const postBlackJackGame = async (
  userId: string,
  didWin: boolean,
  betValue: number
): Promise<void> => {
  const winOrLoseGame = didWin ? 'won' : 'lost';
  const winOrLoseMoney = didWin ? 'earn' : 'lost';

  await Prisma.blackjackuser.upsert({
    where: { user_id: userId },
    update: {
      [`${winOrLoseMoney}_money`]: { increment: betValue },
      [`${winOrLoseGame}_games`]: { increment: 1 },
    },
    create: {
      [`${winOrLoseMoney}_money`]: betValue,
      [`${winOrLoseGame}_games`]: 1,
      user_id: userId,
    },
  });
};

export const postCoinflip = async (
  winnerId: string,
  loserId: string,
  value: number
): Promise<void> => {
  await Prisma.$transaction([
    Prisma.coinflipuser.upsert({
      where: { user_id: winnerId },
      update: { won_games: { increment: 1 }, earn_money: { increment: value } },
      create: { won_games: 1, earn_money: value, user_id: winnerId },
    }),
    Prisma.coinflipuser.upsert({
      where: { user_id: loserId },
      update: { lost_games: { increment: 1 }, lost_money: { increment: value } },
      create: { lost_games: 1, lost_money: value, user_id: loserId },
    }),
  ]);
};

export const postHunt = async (
  userId: string,
  huntType: HuntTypes,
  value: number,
  success: number,
  tries: number,
  userTag: string
): Promise<void> => {
  await ensureUser(userId);

  await Prisma.hunts.upsert({
    where: { user_id: userId },
    update: {
      [`${huntType}_hunted`]: { increment: value },
      [`${huntType}_tries`]: { increment: tries },
      [`${huntType}_success`]: { increment: success },
    },
    create: {
      user_id: userId,
      [`${huntType}_hunted`]: value,
      [`${huntType}_tries`]: tries,
      [`${huntType}_success`]: success,
    },
  });

  if (value === 0) return;

  await Prisma.weekly_hunts.create({
    data: {
      hunt_type: huntType,
      hunted: value,
      user_id: userId,
      user_tag: userTag,
    },
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

  await Prisma.bichouser
    .upsert({
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
    })
    .catch(err => {
      console.error('[PRISMA ERROR] - Error in upsert bicho status', err);
    });
};

export const getUserHuntData = async (userId: string): Promise<hunts | null> =>
  Prisma.hunts.findUnique({ where: { user_id: userId } });

export async function getInactiveUsersLastCommand(
  users: string[] = []
): Promise<{ user: string; date: number }[]> {
  const results = (await Prisma.$queryRaw`SELECT lc.user_id, lc.date FROM uses lc LEFT JOIN uses nc ON lc.user_id = nc.user_id AND lc.date > nc.date WHERE (nc.date IS NULL) AND (lc.date < ${
    Date.now() - 604800000
  }) AND (lc.user_id IN (${users})) ORDER BY lc.date DESC`) as { user: string; date: number }[];

  return results;
}

export const getUserProfileData = async (
  userId: string
): Promise<{ totalUses: number; topCommand: { name: string; uses: number } } | null> => {
  const result = await Prisma.usercmds.findFirst({
    orderBy: { uses: 'desc' },
    where: { user_id: userId },
    take: 1,
    include: { user: { select: { uses: true } }, cmd: { select: { name: true } } },
  });

  if (!result) return null;

  return { totalUses: result.user.uses, topCommand: { name: result.cmd.name, uses: result.uses } };
};

export const getUserTopCommandsUsed = async (
  userId: string
): Promise<{ name: string; count: number }[]> => {
  const result = await Prisma.usercmds.findMany({
    take: 10,
    where: { user_id: userId },
    include: {
      cmd: {
        select: {
          name: true,
        },
      },
    },
    orderBy: { uses: 'desc' },
  });

  return result.map(data => ({ name: data.cmd.name, count: data.uses }));
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

export const updateUserPokerStatus = async (
  userId: string,
  chips: number,
  didWin: boolean,
  hand: string
): Promise<void> => {
  const winOrLoseGame = didWin ? 'won' : 'lost';
  const winOrLoseMoney = didWin ? 'earn' : 'lost';
  const userHand = hand.toLowerCase();
  const increment = didWin ? { increment: 1 } : { increment: 0 };

  await Prisma.pokeruser.upsert({
    where: { user_id: userId },
    update: {
      [`${winOrLoseMoney}_money`]: { increment: chips },
      [`${winOrLoseGame}_games`]: { increment: 1 },
      [userHand]: increment,
    },
    create: {
      [`${winOrLoseMoney}_money`]: chips,
      [`${winOrLoseGame}_games`]: 1,
      [userHand]: didWin ? 1 : 0,
      user_id: userId,
    },
  });
};

export const getRouletteStatus = async (userId: string): Promise<GamblingStats | null> => {
  const result = await Prisma.roletauser.findUnique({
    where: { user_id: userId },
  });

  if (!result) return null;

  return result;
};

export const getTopBlackjack = async (
  skip: number,
  bannedUsers: string[],
  type: 'money' | 'wins'
): Promise<GamblingStats[]> => {
  const toOrderBy = type === 'money' ? 'earn_money' : 'won_games';

  const result = await Prisma.blackjackuser.findMany({
    take: 10,
    skip,
    where: { user_id: { notIn: bannedUsers } },
    orderBy: { [toOrderBy]: 'desc' },
  });

  return result;
};

export const getTopCoinflip = async (
  skip: number,
  bannedUsers: string[],
  type: 'money' | 'wins'
): Promise<GamblingStats[]> => {
  const toOrderBy = type === 'money' ? 'earn_money' : 'won_games';

  const result = await Prisma.coinflipuser.findMany({
    take: 10,
    skip,
    where: { user_id: { notIn: bannedUsers } },
    orderBy: { [toOrderBy]: 'desc' },
  });

  return result;
};

export const getUserLastBanDate = async (userId: string): Promise<null | string> => {
  const result = await Prisma.uses
    .findFirst({
      where: {
        AND: [
          { cmd_id: 283 },
          { user_id: '435228312214962204' },
          { args: { startsWith: `tipo:add user:${userId}` } },
        ],
      },
      orderBy: { id: 'desc' },
    })
    .catch(() => null);

  if (!result) return null;

  return `${result.date}`;
};

export const getUserAllBans = async (userId: string): Promise<null | string> => {
  const result = await Prisma.uses
    .findMany({
      where: {
        AND: [
          { cmd_id: 283 },
          { user_id: '435228312214962204' },
          { args: { startsWith: `tipo:add user:${userId}` } },
        ],
      },
      orderBy: { id: 'desc' },
      select: { args: true, date: true },
    })
    .catch(() => null);

  if (!result) return null;

  return result.map(a => ({
    date: `${a.date}`,
    reason: a.args.slice(`tipo:add user:${userId} motivo:`.length),
  }));
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
): Promise<GamblingStats[]> => {
  const toOrderBy = type === 'money' ? 'earn_money' : 'won_games';

  const result = await Prisma.roletauser.findMany({
    take: 10,
    skip,
    where: { user_id: { notIn: bannedUsers } },
    orderBy: { [toOrderBy]: 'desc' },
  });

  return result;
};

export const getTopBicho = async (
  skip: number,
  bannedUsers: string[],
  type: 'wins' | 'money'
): Promise<GamblingStats[]> => {
  const toOrderBy = type === 'money' ? 'earn_money' : 'won_games';

  const result = await Prisma.bichouser.findMany({
    take: 10,
    skip,
    where: { user_id: { notIn: bannedUsers } },
    orderBy: { [toOrderBy]: 'desc' },
  });

  return result;
};

export type WeeklyHuntersTop = {
  hunt_type: string;
  hunted: number;
  user_id: string;
  user_tag: string;
};

export type WeeklyHuntersTopDated = { data: WeeklyHuntersTop[]; nextUpdate: number };

export const deleteOldWeeklyHunters = async (): Promise<void> => {
  const week = new Date();
  week.setDate(week.getDate() - 7);

  await Prisma.weekly_hunts.deleteMany({ where: { hunted_at: { lt: week } } });
};

export const getWeeklyHuntersTop = async (): Promise<WeeklyHuntersTop[]> => {
  const week = new Date();
  week.setDate(week.getDate() - 7);

  const rawData = await Prisma.weekly_hunts.findMany({
    where: { hunted_at: { gte: week }, hunted: { gt: 0 } },
    select: { hunt_type: true, hunted: true, user_id: true, user_tag: true },
    orderBy: { id: 'desc' },
  });

  const result = rawData.reduce<WeeklyHuntersTop[]>((acc, cur) => {
    const found = acc.find(u => u.user_id === cur.user_id && u.hunt_type === cur.hunt_type);

    if (!found) {
      acc.push(cur);
      return acc;
    }

    found.hunted += cur.hunted;

    return acc;
  }, []);

  return result;
};

export const createTransaction = async (
  authorId: string,
  targetId: string,
  amount: number,
  currencyType: string,
  reason: string
): Promise<void> => {
  await Prisma.transactions.create({
    data: {
      amount,
      currency_type: currencyType,
      reason,
      target_id: targetId,
      author_id: authorId,
      date: Date.now(),
    },
  });
};

export const paidTaxes = async (userId: string, taxes: number): Promise<void> => {
  await Prisma.users.update({ where: { id: userId }, data: { taxes: { increment: taxes } } });
};

export const getTransactions = async (userId: string, page: number): Promise<unknown[]> => {
  const result = await Prisma.transactions.findMany({
    orderBy: { id: 'desc' },
    take: 10,
    skip: 10 * (page - 1),
    where: {
      OR: [{ target_id: userId }, { author_id: userId }],
    },
  });

  return result.map(a => ({ ...a, date: `${a.date}` }));
};

export const registerFarmAction = async (
  userId: string,
  plant: number,
  action: 'HARVEST' | 'ROTTED'
): Promise<void> => {
  await Prisma.farmuser.upsert({
    where: {
      user_id_plant: {
        user_id: userId,
        plant,
      },
    },
    update: { [action.toLowerCase()]: { increment: 1 } },
    create: {
      user_id: userId,
      plant,
      [action.toLowerCase()]: 1,
    },
  });
};

export const getFarmerData = async (userId: string): Promise<farmuser[]> =>
  Prisma.farmuser.findMany({ where: { user_id: userId } });
