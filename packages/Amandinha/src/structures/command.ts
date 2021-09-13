/* eslint-disable import/no-cycle */
import { PermissionString } from 'discord.js';
// eslint-disable-next-line import/no-cycle
import WatchClient from '../client';
import CommandContext from './CommandContext';

type CategoryTypes = 'util' | 'dev' | 'mod' | 'fun';

interface CommandConfig {
  category: CategoryTypes;
  aliases: Array<string>;
  UserPermission: Array<PermissionString>;
  ClientPermissions: Array<PermissionString>;
  OnlyDevs: boolean;
  dir?: string;
}

export default abstract class Command {
  public client!: WatchClient;

  public config: CommandConfig;

  public name: string;

  public abstract run(ctx: CommandContext): unknown;

  public dir!: string;

  constructor(client: WatchClient, name: string, options: Partial<CommandConfig>) {
    this.client = client;
    this.name = name;
    this.config = {
      category: options.category || 'dev',
      aliases: options.aliases || [],
      UserPermission: options.UserPermission ?? [],
      ClientPermissions: options.ClientPermissions ?? [],
      OnlyDevs: options.OnlyDevs || false,
    };
  }
}
