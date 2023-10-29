/* eslint-disable camelcase */
export type Nullable<T> = T | null;

export interface CommandCount {
  name: string;
  uses: number;
}

export type AllNulable<T> = { [P in keyof T]: T[P] | null };

export type HuntTypes = 'demon' | 'giant' | 'angel' | 'archangel' | 'demigod' | 'god';

export interface GamblingStats {
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

export interface BichoGamePlayer {
  id: string;
  profit: number;
  bet: number;
  didWin: boolean;
}

export interface CommandInteractionOption {
  name: string;
  type: string;
  value?: string | number | boolean;
  focused?: boolean;
  autocomplete?: boolean;
  options?: CommandInteractionOption[];
  user?: { id: string };
  member?: unknown;
  channel?: { id: string };
  role?: { id: string };
  attachment?: unknown;
  message?: unknown;
}
