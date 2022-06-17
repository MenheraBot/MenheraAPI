export interface IShardStatus extends Object {
  id: number;
  memoryUsed: number;
  uptime: number;
  guilds: number;
  unavailable: number;
  ping: number;
  lastPingAt: number;
  connected: number;
  members: number;
  clusterId: number;
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
  nameLocalizations: unknown;
  descriptionLocalizations: unknown;
  options: unknown[];
  disabled: ICommandDisabledData;
}
