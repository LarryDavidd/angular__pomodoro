import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { TodoStore } from '../../../store/todo-store';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-todos',
  imports: [NgClass, MatIconModule],
  templateUrl: './todos.html',
  styleUrl: './todos.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Todos {
  readonly state = inject(TodoStore);
  public isVisibleCompletedTodos = signal(false);

  public ucompletedTodos = this.state.ucompletedTodos;
  public completedTodos = this.state.complitedTodos;
  public isEmptyTodos = this.state.isEmptyTodos;

  public showCompletedTodos() {
    this.isVisibleCompletedTodos.update((value) => !value);
  }

  public todoCompleteHandler(idTodo: string): void {
    this.state.todoChangeComplete(idTodo);
  }

  public getFormattedDate(timeCreate: string): string {
    const today = new Date();
    const todayFormatted = `${today.getDate()}, ${
      today.getMonth() + 1
    }, ${today.getFullYear()}`;

    if (timeCreate === todayFormatted) {
      return 'Сегодня';
    }

    const [day, month, year] = timeCreate.split(', ').map(Number);
    const todoDate = new Date(year, month - 1, day);

    const months = [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря',
    ];

    return todoDate < today
      ? `${day} ${months[month - 1]}`
      : `${day} ${months[month - 1]}`;
  }

  public createArray(length: number): string[] {
    return Array.from({ length });
  }

  public isNumberMoreFive(value: number): boolean {
    return value <= 5;
  }
}
