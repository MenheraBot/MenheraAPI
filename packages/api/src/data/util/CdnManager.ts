/* eslint-disable no-restricted-syntax */
export interface AssetsLimit {
  angry: number;
  bicuda: number;
  bite: number;
  cheek: number;
  cry: number;
  disgusted: number;
  fear: number;
  fodase: number;
  grumble: number;
  hug: number;
  humor: number;
  kill: number;
  kiss: number;
  laugh: number;
  mamar: number;
  pat: number;
  poke: number;
  punch: number;
  resurrect: number;
  sarrar: number;
  // eslint-disable-next-line camelcase
  sarrar_sozinho: number;
  shot: number;
  shy: number;
  slap: number;
  sniff: number;
  think: number;
}

export default class CdnManager {
  private static instance?: CdnManager;

  private AssetLimits: Array<AssetsLimit>;

  public interval: NodeJS.Timer;

  private async reloadAssets() {
    this.AssetLimits = await (await fetch(process.env.CDN_URL)).json();
  }

  private constructor(fetchInterval = 21600000) {
    this.reloadAssets();
    this.interval = setInterval(() => this.reloadAssets(), fetchInterval);
  }

  public getLimits(): Array<AssetsLimit> {
    return this.AssetLimits;
  }

  public getLink(type: keyof AssetsLimit): string {
    if (!this.AssetLimits[type]) return 'NO-LINKS';

    const random = Math.floor(Math.random() * this.AssetLimits[type]);

    return `${process.env.CDN_URL}/${type}/${random}`;
  }

  static getInstance(): CdnManager {
    this.instance ??= new CdnManager();

    return this.instance;
  }
}
