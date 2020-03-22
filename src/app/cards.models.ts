export const enum Suit {
  Hearts = 'hearts',
  Clubs = 'clubs',
  Diamonds = 'diamonds',
  Spades = 'spades',
}

export interface Card {
  id: string;
  suit: Suit;
  rank: string;
}

export type Hand = readonly Card[];
export type Hands = readonly Hand[];
