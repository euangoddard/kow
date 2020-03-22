import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CardsService } from 'src/app/cards.service';
import { LinkConfig } from 'src/app/controls/models';

@Component({
  selector: 'kow-links',
  templateUrl: './links.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinksComponent implements OnChanges {
  @Input() config: LinkConfig;

  links: Link[] = [];

  constructor(private readonly cardsService: CardsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const configChange = changes.config;
    if (configChange && configChange.currentValue) {
      const { players, cards } = configChange.currentValue as LinkConfig;
      this.generateLinks(players, cards);
    }
  }

  private generateLinks(players: number, cards: number): void {
    const hands = this.cardsService.buildHands(players, cards);
    this.links = hands.map(hand => {
      const handId = this.cardsService.encodeHand(hand);
      return { link: `${location.origin}/hand/${handId}`, label: handId, isCopied: false };
    });
  }
}

interface Link {
  link: string;
  label: string;
  isCopied: boolean;
}
