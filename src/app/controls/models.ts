interface Option {
  label: string;
  value: number;
}

export type Options = readonly Option[];

export interface LinkConfig {
  players: number;
  cards: number;
}
