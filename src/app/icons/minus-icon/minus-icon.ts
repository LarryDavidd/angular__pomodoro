import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'svg[minus-icon]',
  imports: [],
  templateUrl: './minus.svg',
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
export class MinusIcon {}
