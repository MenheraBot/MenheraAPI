/* eslint-disable camelcase */
export type ActivityType = 'PLAYING' | 'LISTENING' | 'WATCHING' | 'STREAMING';

export type Nullable<T> = T | null;

export interface Activity {
  name: string;
  type: ActivityType;
  url?: string;
}

export interface commandInterface {
  name: string;
  usages: Nullable<number>;
}

export type AllNulable<T> = { [P in keyof T]: T[P] | null };

export type HuntTypes = 'demon' | 'giant' | 'angel' | 'archangel' | 'demigod' | 'god';

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
  uses: Nullable<number>;
}

export interface usagesInterface {
  command: {
    usages: number | null;
    name: string;
  } | null;
  user: {
    uses: number | null;
    id: string;
  } | null;
}

export type BichoBetType =
  | 'unity'
  | 'ten'
  | 'hundred'
  | 'thousand'
  | 'animal'
  | 'sequence'
  | 'corner';
