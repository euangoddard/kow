import { Injectable } from '@angular/core';
import { chunk, shuffle, slice } from 'lodash-es';
import { Card, Hand, Hands, Suit } from 'src/app/cards.models';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  constructor() {}

  buildHands(players: number, cards: number): Hands {
    const shuffledCardIds = shuffle(CARD_IDS);
    const shuffledCards = shuffledCardIds.map(createCard);
    return slice(chunk(shuffledCards, cards), 0, players);
  }

  encodeHand(hand: Hand): string {
    const cardIds = hand.map(({ id }) => id);
    const idIndices = cardIds.map(id => CARD_IDS.indexOf(id as any));
    const indicesEncoded = idIndices.map(index => ENCODING_KEY[index]);
    return indicesEncoded.join('');
  }

  decodeHand(handEncoded: string): Hand {
    const indicesEncoded = handEncoded.split('');
    const idIndices = indicesEncoded.map(indexEncoded => ENCODING_KEY.indexOf(indexEncoded));
    const cardsId = idIndices.map(idIndex => CARD_IDS[idIndex]);
    return cardsId.map(createCard);
  }
}

export function createCard(cardId: string): Card {
  if (!CARD_IDS.includes(cardId as any)) {
    throw new Error(`Could not parse card ID: ${cardId}`);
  }

  const cardIdMatch = cardId.match(CARD_ID_REG_EXP);
  if (!cardIdMatch) {
    throw new Error(`Could not parse card ID: ${cardId}`);
  }

  const rankId = cardIdMatch[1];
  const rank = RANKS_BY_ID[rankId];

  const suitId = cardIdMatch[2];
  const suit = SUITS_BY_ID[suitId];

  return {
    rank,
    suit,
    id: cardId,
  };
}

const ENCODING_KEY = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const CARD_IDS = [
  '10C',
  '10D',
  '10H',
  '10S',
  '2C',
  '2D',
  '2H',
  '2S',
  '3C',
  '3D',
  '3H',
  '3S',
  '4C',
  '4D',
  '4H',
  '4S',
  '5C',
  '5D',
  '5H',
  '5S',
  '6C',
  '6D',
  '6H',
  '6S',
  '7C',
  '7D',
  '7H',
  '7S',
  '8C',
  '8D',
  '8H',
  '8S',
  '9C',
  '9D',
  '9H',
  '9S',
  'AC',
  'AD',
  'AH',
  'AS',
  'JC',
  'JD',
  'JH',
  'JS',
  'KC',
  'KD',
  'KH',
  'KS',
  'QC',
  'QD',
  'QH',
  'QS',
] as const;

const CARD_ID_REG_EXP = /^([0-9JQKA]{1,2})([HCDS])$/;

const SUITS_BY_ID: Record<string, Suit> = {
  H: Suit.Hearts,
  C: Suit.Clubs,
  D: Suit.Diamonds,
  S: Suit.Spades,
} as const;

const RANKS_BY_ID: Record<string, string> = {
  A: 'Ace',
  '2': 'Two',
  '3': 'Three',
  '4': 'Four',
  '5': 'Five',
  '6': 'Six',
  '7': 'Seven',
  '8': 'Eight',
  '9': 'Nine',
  '10': 'Ten',
  J: 'Jack',
  Q: 'Queen',
  K: 'King',
};
