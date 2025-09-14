import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MinusIcon } from '../../../icons/minus-icon/minus-icon';
import { PlusIcon } from '../../../icons/plus-icon/plus-icon';
import { TomatoIcon } from '../../../icons/tomato-icon/tomato-icon';

@Component({
  selector: 'app-todo-inc-modal',
  imports: [MatIconModule, MinusIcon, PlusIcon, TomatoIcon],
  templateUrl: './todo-inc-modal.html',
  styleUrl: './todo-inc-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoIncModal {
  public activeValueCount = input.required<number>();
  public activeValueCountChange = output<number>();
  public close = input.required<() => void>();

  private el = inject(ElementRef);

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.close()();
    }
  }

  public onInput(event: Event) {
    const input = event.target;

    if (!(input instanceof HTMLInputElement)) return;

    let value = input.value.slice(0, 4).replace(/^0+(?=\d)/, '');

    if (value === '') {
      value = '0';
    }

    let num = Number(value);
    if (num > 1000) {
      value = '1000';
    }

    input.value = value;
    this.updateValue(num);
  }

  private updateValue(newValue: number) {
    if (newValue > 1000) {
      newValue = 1000;
    } else if (newValue < 0) {
      newValue = 0;
    }

    this.activeValueCountChange.emit(newValue);
    this.activeValueCountChange.emit(newValue);
  }

  public increaseValue() {
    this.updateValue(this.activeValueCount() + 1);
  }

  public decreaseValue() {
    this.updateValue(Math.max(0, this.activeValueCount() - 1));
  }
}
