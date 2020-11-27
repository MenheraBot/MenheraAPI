export type ActivityType = 'PLAYING' | 'LISTENING' | 'WATCHING' | 'STREAMING'

export interface Activity {
  name: string;
  type: ActivityType
}

export interface ICommands {
  authorName: string,
  authorId: string,
  guildName: string,
  guildId: string,
  commandName: string,
  data: string,
}
