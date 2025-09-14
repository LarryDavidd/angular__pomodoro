import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'svg[plus-icon]',
  imports: [],
  templateUrl: './plus.svg',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        display: inline-block;
        width: 18px;
        height: 18px;
      }
    `,
  ],
})
export class PlusIcon {}
