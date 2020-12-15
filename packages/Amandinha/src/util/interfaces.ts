interface boost {
  name: string;
  value: number;
}
interface ability {
  name: string;
  description: string;
  cooldown: number;
  damage: number;
  heal: number;
  cost: number;
  type: string;
}

export default interface family {
  _id: string;
  abilities: Array<ability>;
  boost: boost;
  members: Array<string>;
  levelFamilia: number;
  bank: string;
  nextLevel: string;
}
