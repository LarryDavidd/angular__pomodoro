import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { isEmptyValidate } from '../../../utils/is-empty-validate';
import { TodoStore } from '../../../store/todo-store';

@Component({
  selector: 'app-form-todos',
  imports: [MatIconModule, ReactiveFormsModule],
  templateUrl: './form-todos.html',
  styleUrl: './form-todos.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormTodos {
  readonly state = inject(TodoStore);
  public fiveArray = Array.from({ length: 5 });
  private activeValueCount = signal(0);

  public addTodoForm = new FormGroup({
    title: new FormControl('', [Validators.required, isEmptyValidate]),
  });

  public addTomatoHandler(index: number, event: Event): void {
    event.preventDefault();
    const currentCount = this.activeValueCount();

    if (index < currentCount - 1) {
      this.activeValueCount.set(index + 1);
    } else if (index === currentCount - 1) {
      this.activeValueCount.set(index);
    } else {
      this.activeValueCount.set(index + 1);
    }
  }

  public isIconActive(index: number): boolean {
    return index < this.activeValueCount();
  }

  public formSubmitHandler(): void {
    const form = this.addTodoForm;
    if (!form.valid) return;

    const { title } = form.value;

    this.state.addTodo({
      title: title!,
      pomodoro: this.activeValueCount(),
    });

    form.reset();
    this.activeValueCount.set(0);
  }
}
