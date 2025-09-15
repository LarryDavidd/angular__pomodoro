import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { TodoStore } from '../../store/todo-store';
import { TomatoIcon } from '../../icons/tomato-icon/tomato-icon';
import { MinusIcon } from '../../icons/minus-icon/minus-icon';
import { PlusIcon } from '../../icons/plus-icon/plus-icon';

@Component({
  selector: 'app-pomodoro-change-values',
  imports: [TomatoIcon, MinusIcon, PlusIcon],
  templateUrl: './pomodoro-change-values.html',
  styleUrl: './pomodoro-change-values.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PomodoroChangeValues {
  readonly state = inject(TodoStore);

  public activeValueCount = input.required<number>();
  public activeTodoId = input.required<string>();

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

    this.state.todoChangePomodoroValue(this.activeTodoId(), newValue);
  }

  public increaseValue() {
    this.updateValue(this.activeValueCount() + 1);
  }

  public decreaseValue() {
    this.updateValue(Math.max(0, this.activeValueCount() - 1));
  }
}
