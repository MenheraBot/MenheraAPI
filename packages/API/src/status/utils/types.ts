import { ApplicationCommandOptionData } from 'discord.js';

export interface IShardStatus extends Object {
  id: number;
  memoryUsed: number;
  uptime: number;
  guilds: number;
  unavailable: number;
  ping: number;
  lastPingAt: number;
  members: number;
}

export interface ICommandDisabledData {
  isDisabled: boolean;
  reason: string | null;
}

export interface ICommandData {
  name: string;
  category: string;
  cooldown: number;
  description: string;
  options: ApplicationCommandOptionData[];
  disabled: ICommandDisabledData;
}
