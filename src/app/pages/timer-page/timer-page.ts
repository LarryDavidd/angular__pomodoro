import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TimerCanvas } from '../../components/timer-canvas/timer-canvas';
import { TodoStore } from '../../store/todo-store';
import { Todo } from '../../components/todo/todo';
import { Router } from '@angular/router';
import { CapitalizeFirstPipe } from '../../pipes/capitalize-first-pipe';

@Component({
  selector: 'app-timer-page',
  imports: [TimerCanvas, Todo, CapitalizeFirstPipe],
  templateUrl: './timer-page.html',
  styleUrl: './timer-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerPage {
  readonly store = inject(TodoStore);
  private router = inject(Router);

  public ucompletedTodos = this.store.uncompletedTodos;
  public completedTodos = this.store.completedTodos;
  public timeSpent = this.store.totalTimeSpent;
  public selectedPeriod = this.store.selectedPeriod;

  constructor() {}

  public navigateToMain(): void {
    this.router.navigate(['']);
    this.store.clearSelectedTodoId();
  }
}
