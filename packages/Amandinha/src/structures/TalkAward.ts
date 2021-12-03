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

  if (user) {
    if (message.createdTimestamp - user.lastMessageAt[user.lastMessageAt.length - 1] < 1500) {
      user.spamCount += 1;
      user.lastMessageAt.push(message.createdTimestamp);
      return;
    }

    user.sequence += 1;
    user.lastMessageLenght = message.content.length;
    user.totalStreakMessageLenght.push(message.content.length);
    user.stopStreak = Date.now() + 1000 * 30;
    user.lastMessageAt.push(message.createdTimestamp);
  } else {
    Awards.set(message.author.id, {
      sequence: 1,
      lastMessageLenght: message.content.length,
      totalStreakMessageLenght: [message.content.length],
      stopStreak: Date.now() + 1000 * 30,
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
  Awards.forEach((user, userId) => {
    if (user.spamCount >= 5) {
      Awards.delete(userId);
      AwardCooldown.set(userId, Date.now() + 1000 * 60 * 10);
      return;
    }

    if (user.stopStreak < Date.now()) {
      AwardCooldown.set(userId, Date.now() + 1000 * 60 * 1);
      const totalAward = Math.floor(
        Math.random() * user.totalStreakMessageLenght.reduce((p, c) => p + c, 0) +
          user.sequence * 20
      );

      makeRequest(totalAward, userId);

      (user.channelToAnnouce as ThreadChannel).send({
        content: `<@${userId}> ganhou **${totalAward}** :star: por conversar aqui UwU`,
      });

      Awards.delete(userId);
    }
  });
};

setInterval(() => {
  makeCheck();
}, 1000);
