import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { ITodo, TodoStore } from '../../../store/todo-store';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-todo',
  imports: [MatIconModule],
  templateUrl: './todo.html',
  styleUrl: './todo.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Todo {
  readonly state = inject(TodoStore);
  public todo = input.required<ITodo>();

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
