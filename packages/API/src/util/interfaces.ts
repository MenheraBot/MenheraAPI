export type ActivityType = 'PLAYING' | 'LISTENING' | 'WATCHING' | 'STREAMING'

export interface Activity {
  name: string;
  type: ActivityType
}
