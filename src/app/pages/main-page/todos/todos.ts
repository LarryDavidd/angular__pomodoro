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
  readonly store = inject(TodoStore);
  public isVisibleCompletedTodos = signal(false);

  public ucompletedTodos = this.store.ucompletedTodos;
  public completedTodos = this.store.complitedTodos;
  public highPriorityTodos = this.store.highPriorityTodos;
  public mediumPriorityTodos = this.store.mediumPriorityTodos;
  public lowPriorityTodos = this.store.lowPriorityTodos;
  public noPriorityTodos = this.store.noPriorityTodos;

  public isEmptyTodos = this.store.isEmptyTodos;
  public sortTodos = this.store.sortOrder;

  public isPriorityOrder = computed(
    () => this.sortTodos()() === 'priority_order'
  );

  public isEmptyUcompletedTodos = computed(
    () => this.ucompletedTodos().length > 0
  );

  public isEmptyCompletedTodos = computed(
    () => this.completedTodos().length > 0
  );

  public isEmptyhighPriorityTodos = computed(
    () => this.highPriorityTodos().length > 0
  );

  public isEmptymediumPriorityTodos = computed(
    () => this.mediumPriorityTodos().length > 0
  );

  public isEmptylowPriorityTodos = computed(
    () => this.lowPriorityTodos().length > 0
  );

  public isEmptynoPriorityTodos = computed(
    () => this.noPriorityTodos().length > 0
  );

  public showCompletedTodos() {
    this.isVisibleCompletedTodos.update((value) => !value);
  }
}
