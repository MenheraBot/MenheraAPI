import {
  DMChannel,
  Message,
  NewsChannel,
  PartialDMChannel,
  TextChannel,
  ThreadChannel,
} from 'discord.js';
import Axios from 'axios';

interface TalkAwardData {
  sequence: number;
  stopStreak: number;
  lastMessageAt: number[];
  lastMessageLenght: number;
  totalStreakMessageLenght: number[];
  channelToAnnouce: PartialDMChannel | DMChannel | TextChannel | NewsChannel | ThreadChannel;
  spamCount: number;
}

const AwardCooldown = new Map<string, number>();

const Awards = new Map<string, TalkAwardData>();

const makeRequest = async (total: number, userId: string): Promise<void> => {
  Axios.patch(
    process.env.MENHERA_URL as string,
    { total, userId },
    {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': process.env.MENHERA_AGENT as string,
        Authorization: process.env.API_TOKEN as string,
      },
    }
  ).catch(() => null);
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
      channelToAnnouce: message.channel,
    });
  }
};

const makeCheck = () => {
  AwardCooldown.forEach((cd, user) => {
    if (cd < Date.now()) AwardCooldown.delete(user);
  });
  Awards.forEach((user, userId) => {
    if (user.spamCount > 10) {
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

      user.channelToAnnouce.send({
        content: `<@${userId}> ganhou **${totalAward}** :star: por conversar aqui UwU`,
      });

      Awards.delete(userId);
    }
  });
};

setInterval(() => {
  makeCheck();
}, 1000);
