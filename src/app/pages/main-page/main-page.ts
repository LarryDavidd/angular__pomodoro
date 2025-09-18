import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TodoStore } from '../../store/todo-store';
import { Todos } from './todos/todos';
import { FormTodos } from './form-todos/form-todos';
import { SortModal } from '../../ui/sort-modal/sort-modal';

@Component({
  selector: 'app-main-page',
  imports: [MatIconModule, Todos, FormTodos, SortModal],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPage {
  readonly state = inject(TodoStore);
  public isOpenSortModal = signal(false);

  constructor() {
    this.state.loadPageTodo();
  }

  public dayTodo = this.state.dayTodo;
  public estimatedTime = this.state.estimatedTime;
  public timeSpent = this.state.timeSpent;
  public completedTodos = this.state.complitedTodos;
  public uncompletedTodos = this.state.ucompletedTodos;

  public openSortModalHandler(): void {
    this.isOpenSortModal.update((value) => !value);
  }

  public closeModal = () => {
    this.isOpenSortModal.set(false);
  };
}
