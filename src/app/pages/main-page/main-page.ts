/* eslint-disable unicorn/consistent-function-scoping */
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TodoStore } from '../../store/todo-store';
import { Todos } from './todos/todos';
import { FormTodos } from './form-todos/form-todos';
import { SortModal } from '../../ui/sort-modal/sort-modal';
import { CapitalizeFirstPipe } from '../../pipes/capitalize-first-pipe';

@Component({
  selector: 'app-main-page',
  imports: [MatIconModule, Todos, FormTodos, SortModal, CapitalizeFirstPipe],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPage {
  readonly store = inject(TodoStore);
  public isOpenSortModal = signal(false);

  constructor() {
    this.store.loadPageTodo();
  }

  public completedTodos = this.store.completedTodos;
  public uncompletedTodos = this.store.uncompletedTodos;
  public selectedPeriod = this.store.selectedPeriod;

  public estimatedTime = computed(() => {
    const totalPomodoros = this.uncompletedTodos().reduce(
      (acc, curr) => acc + curr.pomodoroValue,
      0
    );

    const [minutes] = this.store.timerPomodoro().split(':').map(Number);

    return totalPomodoros * minutes;
  });

  public timeSpent = this.store.totalTimeSpent;

  public openSortModalHandler(): void {
    this.isOpenSortModal.update((value) => !value);
  }

  public closeModal = () => {
    this.isOpenSortModal.set(false);
  };
}
