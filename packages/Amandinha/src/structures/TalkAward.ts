import { GuildChannel, Message, ThreadChannel } from 'discord.js';
import mongoDb from './mongoDb';

interface TalkAwardData {
  sequence: number;
  stopStreak: number;
  lastMessageAt: number[];
  lastMessageLenght: number;
  totalStreakMessageLenght: number[];
  channelToAnnouce: GuildChannel | ThreadChannel | undefined;
  spamCount: number;
}

const AwardCooldown = new Map<string, number>();

const Awards = new Map<string, TalkAwardData>();

const makeRequest = async (total: number, userId: string): Promise<void> => {
  mongoDb(userId, total);
};

export default (message: Message): void => {
  if (AwardCooldown.has(message.author.id)) return;

  const user = Awards.get(message.author.id);
  const messageLength = message.content.replace(/(.)(?=.*\1)/g, '');

  if (user) {
    if (message.createdTimestamp - user.lastMessageAt[user.lastMessageAt.length - 1] < 1500) {
      user.spamCount += 1;
      user.lastMessageAt.push(message.createdTimestamp);
      return;
    }

    user.sequence += 1;
    user.lastMessageLenght = messageLength.length;
    user.totalStreakMessageLenght.push(messageLength.length > 300 ? 300 : messageLength.length);
    user.stopStreak = Date.now() + 1000 * 15;
    user.lastMessageAt.push(message.createdTimestamp);
  } else {
    Awards.set(message.author.id, {
      sequence: 1,
      lastMessageLenght: messageLength.length,
      totalStreakMessageLenght: [messageLength.length > 300 ? 300 : messageLength.length],
      stopStreak: Date.now() + 1000 * 15,
      lastMessageAt: [message.createdTimestamp],
      spamCount: 0,
      channelToAnnouce: message.guild?.channels.cache.get('916340162747834368'),
    });
  }
};

const makeCheck = () => {
  AwardCooldown.forEach((cd, user) => {
    if (cd < Date.now()) AwardCooldown.delete(user);
  });
  Awards.forEach(async (user, userId) => {
    if (user.spamCount >= 5) {
      Awards.delete(userId);
      AwardCooldown.set(userId, Date.now() + 1000 * 60 * 10);
      return;
    }

    if (user.stopStreak < Date.now()) {
      AwardCooldown.set(userId, Date.now() + 1000 * 60 * 2);
      const totalAward = Math.floor(
        Math.random() * user.totalStreakMessageLenght.reduce((p, c) => p + c, 0) +
          user.sequence * 10
      );

      makeRequest(totalAward, userId);

      (user.channelToAnnouce as ThreadChannel).send({
        content: `${await user.channelToAnnouce?.guild.members
          .fetch(userId)
          .then(a => a.nickname ?? a.user.username)
          .catch(() => `<@${userId}>`)} ganhou **${totalAward}** :star: por conversar aqui UwU`,
      });

      Awards.delete(userId);
    }
  });
};

setInterval(() => {
  makeCheck();
}, 1000);
