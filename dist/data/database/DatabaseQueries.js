"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopBicho = exports.getTopRoulette = exports.getTopHunt = exports.getTopCoinflip = exports.getTopBlackjack = exports.getRouletteStatus = exports.createRouletteGame = exports.updateUserRouletteStatus = exports.getUserTopCommandsUsed = exports.getUserCommandsUsesCount = exports.getInactiveUsersLastCommand = exports.getUserHuntData = exports.updateUserBichoStatus = exports.postHunt = exports.postCoinflip = exports.postBlackJackGame = exports.getBlackJackStats = exports.getBichoStats = exports.getCoinflipStats = exports.createCommandExecution = exports.getTopUsers = exports.getTopCommands = exports.ensureUser = exports.ensureCommand = void 0;
const Connection_1 = __importDefault(require("./Connection"));
const ensureCommand = async (commandsName) => {
    const command = await Connection_1.default.cmds.findFirst({ where: { name: commandsName } });
    if (command)
        return command.id;
    const res = await Connection_1.default.cmds.create({ data: { name: commandsName } });
    return res.id;
};
exports.ensureCommand = ensureCommand;
const ensureUser = async (userId) => {
    const user = await Connection_1.default.users.findUnique({ where: { id: userId } });
    if (user)
        return user.id;
    const res = await Connection_1.default.users.create({ data: { id: userId } });
    return res.id;
};
exports.ensureUser = ensureUser;
const incrementUsages = async (userId, commandId) => {
    await Connection_1.default.$transaction([
        Connection_1.default.users.update({ where: { id: userId }, data: { uses: { increment: 1 } } }),
        Connection_1.default.cmds.update({ where: { id: commandId }, data: { usages: { increment: 1 } } }),
    ]);
};
const getTopCommands = async () => {
    return Connection_1.default.cmds.findMany({
        orderBy: { usages: 'desc' },
        take: 10,
        select: { name: true, usages: true },
    });
};
exports.getTopCommands = getTopCommands;
const getTopUsers = async () => {
    return Connection_1.default.users.findMany({
        orderBy: { uses: 'desc' },
        take: 10,
        select: { id: true, uses: true }, // ok
    });
};
exports.getTopUsers = getTopUsers;
const createCommandExecution = async (userId, guildId, commandName, date, args) => {
    const commandId = await (0, exports.ensureCommand)(commandName);
    await (0, exports.ensureUser)(userId);
    await Connection_1.default.uses.create({
        data: { guild_id: guildId, args, user_id: userId, cmd_id: commandId, date },
    });
    await incrementUsages(userId, commandId);
};
exports.createCommandExecution = createCommandExecution;
const getCoinflipStats = async (userId) => {
    await (0, exports.ensureUser)(userId);
    const result = await Connection_1.default.users.findUnique({
        where: { id: userId },
        select: { cf_wins: true, cf_loses: true, cf_win_money: true, cf_lose_money: true },
    });
    return result;
};
exports.getCoinflipStats = getCoinflipStats;
const getBichoStats = async (userId) => {
    const result = await Connection_1.default.bichouser.findUnique({
        where: { user_id: userId },
        select: {
            earn_money: true,
            lost_games: true,
            lost_money: true,
            won_games: true,
            user_id: true,
        },
    });
    if (!result)
        return null;
    return result;
};
exports.getBichoStats = getBichoStats;
const getBlackJackStats = async (userId) => {
    await (0, exports.ensureUser)(userId);
    const result = await Connection_1.default.users.findUnique({
        where: { id: userId },
        select: { bj_wins: true, bj_loses: true, bj_win_money: true, bj_lose_money: true },
    });
    return result;
};
exports.getBlackJackStats = getBlackJackStats;
const postBlackJackGame = async (userId, didWin, betValue) => {
    await (0, exports.ensureUser)(userId);
    if (didWin)
        await Connection_1.default.users.update({
            where: { id: userId },
            data: { bj_wins: { increment: 1 }, bj_win_money: { increment: betValue } },
        });
    else
        await Connection_1.default.users.update({
            where: { id: userId },
            data: { bj_loses: { increment: 1 }, bj_lose_money: { increment: betValue } },
        });
};
exports.postBlackJackGame = postBlackJackGame;
const postCoinflip = async (winnerId, loserId, value) => {
    await Promise.all([(0, exports.ensureUser)(winnerId), (0, exports.ensureUser)(loserId)]);
    await Connection_1.default.$transaction([
        Connection_1.default.users.update({
            where: { id: winnerId },
            data: { cf_wins: { increment: 1 }, cf_win_money: { increment: value } },
        }),
        Connection_1.default.users.update({
            where: { id: loserId },
            data: { cf_loses: { increment: 1 }, cf_lose_money: { increment: value } },
        }),
    ]);
};
exports.postCoinflip = postCoinflip;
const postHunt = async (userId, huntType, value, success, tries) => {
    await (0, exports.ensureUser)(userId);
    await Connection_1.default.hunts.upsert({
        where: { user_id: userId },
        update: {
            [`${huntType}_hunted`]: { increment: value },
            [`${huntType}_tries`]: { increment: tries },
            [`${huntType}_success`]: { increment: success },
        },
        create: { user_id: userId },
    });
};
exports.postHunt = postHunt;
const updateUserBichoStatus = async (userId, betValue, profit, didWin) => {
    const winOrLoseGame = didWin ? 'won' : 'lost';
    const winOrLoseMoney = didWin ? 'earn' : 'lost';
    await Connection_1.default.bichouser.upsert({
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
exports.updateUserBichoStatus = updateUserBichoStatus;
const getUserHuntData = async (userId) => {
    return Connection_1.default.hunts.findUnique({ where: { user_id: userId } });
};
exports.getUserHuntData = getUserHuntData;
async function getInactiveUsersLastCommand(users = []) {
    const results = (await Connection_1.default.$queryRaw `SELECT lc.user_id, lc.date FROM uses lc LEFT JOIN uses nc ON lc.user_id = nc.user_id AND lc.date > nc.date WHERE (nc.date IS NULL) AND (lc.date < ${Date.now() - 604800000}) AND (lc.user_id IN (${users})) ORDER BY lc.date DESC`);
    return results;
}
exports.getInactiveUsersLastCommand = getInactiveUsersLastCommand;
const getUserCommandsUsesCount = async (userId) => {
    const commands = await Connection_1.default.users.findUnique({
        where: { id: userId },
        select: { uses: true },
    });
    if (!commands)
        return null;
    return { count: commands.uses ?? 0 };
};
exports.getUserCommandsUsesCount = getUserCommandsUsesCount;
const getUserTopCommandsUsed = async (userId) => {
    const results = await Connection_1.default.$queryRaw `SELECT cmds.name, COUNT(cmds.name) FROM uses INNER JOIN cmds ON uses.cmd_id = cmds.id WHERE user_id = ${userId} GROUP BY cmds.name ORDER BY count DESC LIMIT 10`;
    return results;
};
exports.getUserTopCommandsUsed = getUserTopCommandsUsed;
const updateUserRouletteStatus = async (userId, betValue, profit, didWin) => {
    const winOrLoseGame = didWin ? 'won' : 'lost';
    const winOrLoseMoney = didWin ? 'earn' : 'lost';
    await Connection_1.default.roletauser.upsert({
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
exports.updateUserRouletteStatus = updateUserRouletteStatus;
const createRouletteGame = async (userId, betValue, profit, didWin, betType, selectedValues) => {
    await Promise.all([
        (0, exports.ensureUser)(userId),
        (0, exports.updateUserRouletteStatus)(userId, betValue, profit, didWin),
        Connection_1.default.roulette.create({
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
exports.createRouletteGame = createRouletteGame;
const getRouletteStatus = async (userId) => {
    const result = await Connection_1.default.roletauser.findUnique({
        where: { user_id: userId },
        select: {
            earn_money: true,
            lost_games: true,
            lost_money: true,
            won_games: true,
            user_id: true,
        },
    });
    if (!result)
        return null;
    return result;
};
exports.getRouletteStatus = getRouletteStatus;
const getTopBlackjack = async (skip, bannedUsers, type) => {
    const toOrderBy = type === 'money' ? 'bj_win_money' : 'bj_wins';
    const result = await Connection_1.default.users.findMany({
        take: 10,
        skip,
        where: { id: { notIn: bannedUsers } },
        orderBy: { [toOrderBy]: 'desc' },
        select: { bj_wins: true, bj_win_money: true, bj_loses: true, bj_lose_money: true, id: true },
    });
    return result;
};
exports.getTopBlackjack = getTopBlackjack;
const getTopCoinflip = async (skip, bannedUsers, type) => {
    const toOrderBy = type === 'money' ? 'cf_win_money' : 'cf_wins';
    const result = await Connection_1.default.users.findMany({
        take: 10,
        skip,
        where: { id: { notIn: bannedUsers } },
        orderBy: { [toOrderBy]: 'desc' },
        select: { cf_wins: true, cf_win_money: true, cf_loses: true, cf_lose_money: true, id: true },
    });
    return result;
};
exports.getTopCoinflip = getTopCoinflip;
const getTopHunt = async (skip, bannedUsers, huntType, type) => {
    const result = await Connection_1.default.hunts.findMany({
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
exports.getTopHunt = getTopHunt;
const getTopRoulette = async (skip, bannedUsers, type) => {
    const toOrderBy = type === 'money' ? 'earn_money' : 'won_games';
    const result = await Connection_1.default.roletauser.findMany({
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
exports.getTopRoulette = getTopRoulette;
const getTopBicho = async (skip, bannedUsers, type) => {
    const toOrderBy = type === 'money' ? 'earn_money' : 'won_games';
    const result = await Connection_1.default.bichouser.findMany({
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
exports.getTopBicho = getTopBicho;
