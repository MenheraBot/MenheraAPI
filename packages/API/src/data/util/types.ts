/* eslint-disable camelcase */
export type ActivityType = 'PLAYING' | 'LISTENING' | 'WATCHING' | 'STREAMING';

export interface Activity {
  name: string;
  type: ActivityType;
  url?: string;
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

export interface RouletteStats {
  earn_money: number;
  lost_money: number;
  lost_games: number;
  won_games: number;
}

export interface userInterface {
  id: string;
  uses: number;
}

export interface usagesInterface {
  command: commandInterface;
  user: userInterface;
}

export interface HuntStats {
  user_id: string;
  demon_tries: number;
  demon_success: number;
  demon_hunted: number;
  giant_tries: number;
  giant_success: number;
  giant_hunted: number;
  angel_tries: number;
  angel_success: number;
  angel_hunted: number;
  archangel_tries: number;
  archangel_success: number;
  archangel_hunted: number;
  demigod_tries: number;
  demigod_success: number;
  demigod_hunted: number;
  god_tries: number;
  god_success: number;
  god_hunted: number;
}

export type BichoBetType =
  | 'unity'
  | 'ten'
  | 'hundred'
  | 'thousand'
  | 'animal'
  | 'sequence'
  | 'corner';
