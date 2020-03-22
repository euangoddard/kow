import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, pluck } from 'rxjs/operators';
import { CardsService } from 'src/app/cards.service';

@Component({
  selector: 'kow-hand',
  templateUrl: './hand.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HandComponent {
  hand$ = this.route.params.pipe(
    pluck('hand'),
    map(handEncoded => {
      return this.cardsService.decodeHand(handEncoded);
    }),
  );

  constructor(
    private readonly route: ActivatedRoute,
    private readonly cardsService: CardsService,
  ) {}
}
