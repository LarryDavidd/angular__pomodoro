/* eslint-disable unicorn/consistent-function-scoping */
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { TodoStore } from '../../../store/todo-store';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Todo } from '../todo/todo';

@Component({
  selector: 'app-todos',
  imports: [NgClass, MatIconModule, Todo],
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

  public isEmptyCompletedTodos = computed(
    () => this.completedTodos().length > 0
  );

  public showCompletedTodos() {
    this.isVisibleCompletedTodos.update((value) => !value);
  }
}
