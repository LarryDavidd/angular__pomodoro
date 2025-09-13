import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TodoStore } from '../../store/todo-store';
import { Todos } from './todos/todos';
import { FormTodos } from './form-todos/form-todos';

@Component({
  selector: 'app-main-page',
  imports: [MatIconModule, Todos, FormTodos],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPage {
  readonly state = inject(TodoStore);

  constructor() {
    this.state.loadPageTodo();
  }

  public dayTodo = this.state.dayTodo;
  public estimatedTime = this.state.estimatedTime;
  public tasksAwaiting = this.state.tasksAwaiting;
  public timeSpent = this.state.timeSpent;
  public completedTasks = this.state.completedTasks;
}
