import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { Card } from 'src/app/cards.models';
import { CardsService } from 'src/app/cards.service';

@Component({
  selector: 'kow-hand',
  templateUrl: './hand.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HandComponent {
  readonly hand$: Observable<readonly HandCard[]> = this.route.params.pipe(
    pluck('hand'),
    map(handEncoded => {
      return this.cardsService.decodeHand(handEncoded).map(card => {
        return {
          card,
          isFlipped: false,
        };
      });
    }),
  );

  constructor(
    private readonly route: ActivatedRoute,
    private readonly cardsService: CardsService,
  ) {}
}

interface HandCard {
  card: Card;
  isFlipped: boolean;
}
