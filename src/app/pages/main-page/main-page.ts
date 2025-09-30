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
import { CapitalizeFirstPipe } from '../../pipes/capitalize-first-pipe';
import { ToggleTheme } from '../../ui/toggle-theme/toggle-theme';

@Component({
  selector: 'app-main-page',
  imports: [
    MatIconModule,
    Todos,
    FormTodos,
    SortModal,
    CapitalizeFirstPipe,
    ToggleTheme,
  ],
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
  public estimatedTime = this.store.estimatedTimeTotal;

  public timeSpent = this.store.totalTimeSpent;

  public openSortModalHandler(): void {
    this.isOpenSortModal.update((value) => !value);
  }

  public closeModal = () => {
    this.isOpenSortModal.set(false);
  };
}
