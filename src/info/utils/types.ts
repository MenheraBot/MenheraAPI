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
