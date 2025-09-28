import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'svg[flag-icon]',
  imports: [],
  templateUrl: './flag.svg',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    width: '17',
    height: '18',
    viewBox: '0 0 17 18',
    xmlns: 'http://www.w3.org/2000/svg',
  },
})
export class FlagIcon {}
