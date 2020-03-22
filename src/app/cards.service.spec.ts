import { TestBed } from '@angular/core/testing';
import { Hand, Suit } from 'src/app/cards.models';

import { CardsService, createCard } from './cards.service';

describe('CardsService', () => {
  let service: CardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardsService);
  });

  describe('buildHands', () => {
    it('should be build a hand for the max number of players and cards', () => {
      const hands = service.buildHands(7, 7);
      expect(hands.length).toEqual(7);
      hands.forEach(hand => {
        expect(hand.length).toEqual(7);
      });
    });

    it('should be build a hand for the different numbers of players and cards', () => {
      const hands = service.buildHands(2, 5);
      expect(hands.length).toEqual(2);
      hands.forEach(hand => {
        expect(hand.length).toEqual(5);
      });
    });
  });

  describe('encodeHand', () => {
    it('should encode the hand', () => {
      const hand: Hand = [
        {
          id: '10C',
          suit: Suit.Clubs,
          rank: 'Ten',
        },
        {
          id: 'QS',
          suit: Suit.Spades,
          rank: 'Queen',
        },
      ];
      expect(service.encodeHand(hand)).toEqual('0P');
    });
  });

  describe('decodeHand', () => {
    it('should decode the hand', () => {
      const hand: Hand = [
        {
          id: '10C',
          suit: Suit.Clubs,
          rank: 'Ten',
        },
        {
          id: 'QS',
          suit: Suit.Spades,
          rank: 'Queen',
        },
      ];
      expect(service.decodeHand('0P')).toEqual(hand);
    });
  });
});

describe('createCard', () => {
  it('should create cards from all valid IDs', () => {
    ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'].forEach(rank => {
      ['H', 'C', 'D', 'S'].forEach(suit => {
        const cardId = `${rank}${suit}`;
        expect(createCard(cardId).id).toEqual(cardId);
      });
    });
  });

  it('should throw an error for an invalid card ID', () => {
    expect(() => {
      createCard('11D');
    }).toThrowError(`Could not parse card ID: 11D`);

    expect(() => {
      createCard('AQ');
    }).toThrowError(`Could not parse card ID: AQ`);
  });
});
