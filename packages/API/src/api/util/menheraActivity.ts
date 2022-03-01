import { Activity, ActivityType } from './types';

export default class Activities {
  private static instance?: Activities;

  private static getDefaultActivities(): Array<Activity> {
    return [
      {
        name: '💖 | Obrigada por me salvarem',
        type: 'PLAYING',
      },
      {
        name: '💖 | Twitch da minha Dona',
        type: 'STREAMING',
      },
    ];
  }

  private activities: Array<Activity>;

  private constructor() {
    this.activities = Activities.getDefaultActivities();
  }

  public getAllActivities(): Array<Activity> {
    return this.activities;
  }

  public getRandomActivity(shardId: number): Activity {
    const randomActivity = this.activities[Math.floor(Math.random() * this.activities.length)];
    return {
      name: `${randomActivity.name} | Shard ${shardId}`,
      type: randomActivity.type,
      url: randomActivity.url,
    };
  }

  public addActivity(name: string, type: ActivityType, url: string): void {
    this.activities.push({ name, type, url });
  }

  public clearActivities(): void {
    this.activities = [];
  }

  public resetActivities(): Activity[] {
    this.activities = Activities.getDefaultActivities();
    return this.activities;
  }

  static getInstance(): Activities {
    if (!this.instance) {
      this.instance = new Activities();
    }

    return this.instance;
  }
}
