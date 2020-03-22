import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { range } from 'lodash-es';
import { LinkConfig, Options } from 'src/app/controls/models';

@Component({
  selector: 'kow-controls',
  templateUrl: './controls.component.html',
})
export class ControlsComponent {
  readonly playerOptions = makeOptions(7);
  readonly cardOptions = makeOptions(7);

  config: LinkConfig = null;

  readonly formGroup = this.formBuilder.group({
    players: [7, [Validators.required]],
    cards: [7, [Validators.required]],
  });

  constructor(private readonly formBuilder: FormBuilder) {}

  generateLinks(): void {
    this.config = {
      players: parseInt(this.formGroup.value['players'], 10),
      cards: parseInt(this.formGroup.value['cards'], 10),
    };
  }
}

function makeOptions(maxCount: number): Options {
  return range(1, maxCount + 1).map(value => {
    return {
      label: NUMBER_NAMES.get(value),
      value,
    };
  });
}

const NUMBER_NAMES = new Map([
  [1, 'One'],
  [2, 'Two'],
  [3, 'Three'],
  [4, 'Four'],
  [5, 'Five'],
  [6, 'Six'],
  [7, 'Seven'],
]);
