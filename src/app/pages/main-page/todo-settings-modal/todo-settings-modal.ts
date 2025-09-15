import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
} from '@angular/core';
import { ITodo, Priority, TodoStore } from '../../../store/todo-store';
import { PomodoroChangeValues } from '../../../components/pomodoro-change-values/pomodoro-change-values';
import { FlagIcon } from '../../../icons/flag-icon/flag-icon';
import { SliceTitlePipe } from '../../../pipes/slice-title-pipe';

@Component({
  selector: 'app-todo-settings-modal',
  imports: [PomodoroChangeValues, FlagIcon, SliceTitlePipe],
  templateUrl: './todo-settings-modal.html',
  styleUrl: './todo-settings-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoSettingsModal {
  public todo = input.required<ITodo>();
  readonly state = inject(TodoStore);

  public fourArray = Array.from({ length: 4 });
  public close = input.required<() => void>();

  private el = inject(ElementRef);

  public priorities: Priority[] = [
    'No priority',
    'Low priority',
    'Medium priority',
    'High priority',
  ];

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.close()();
    }
  }

  public isActiveFlag(index: number): boolean {
    const currentPriority = this.todo().priority;

    const priorityIndex = this.priorities.indexOf(currentPriority);

    return index === priorityIndex;
  }

  public getFlagClass(index: number): string {
    const isActive = this.isActiveFlag(index);
    const baseClass = 'icon icon__priority-flag';

    if (!isActive) {
      return `${baseClass} inactive`;
    }

    const priorityClasses = [
      `${baseClass} priority_no`,
      `${baseClass} priority_low`,
      `${baseClass} priority_medium`,
      `${baseClass} priority_hard`,
    ];

    return priorityClasses[index] || baseClass;
  }

  public setPriority(priority: Priority): void {
    this.state.todoChangePriority(this.todo().idTodo, priority);
    this.close()();
  }

  public deleteTodoHandler() {
    this.state.todoDelete(this.todo().idTodo);
    this.close()();
  }
}
