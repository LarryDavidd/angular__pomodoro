import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'svg[tomato-icon]',
  imports: [],
  templateUrl: './tomato.svg',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    width: '17',
    height: '18',
    viewBox: '0 0 17 18',
    xmlns: 'http://www.w3.org/2000/svg',
  },
})
export class TomatoIcon {}
