/* eslint-disable camelcase */
export type ActivityType = 'PLAYING' | 'LISTENING' | 'WATCHING' | 'STREAMING';

export interface Activity {
  name: string;
  type: ActivityType;
}

export interface commandInterface {
  name: string;
  usages: number;
}

export interface CoinflipStats {
  cf_wins: number;
  cf_loses: number;
  cf_win_money: number;
  cf_lose_money: number;
}

export interface BlackJackStats {
  bj_wins: number;
  bj_loses: number;
  bj_win_money: number;
  bj_lose_money: number;
}

export interface userInterface {
  id: string;
  uses: number;
}

export interface usagesInterface {
  command: commandInterface;
  user: userInterface;
}
