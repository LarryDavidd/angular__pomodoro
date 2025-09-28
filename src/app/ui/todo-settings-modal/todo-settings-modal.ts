/* eslint-disable unicorn/consistent-function-scoping */
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  input,
  signal,
} from '@angular/core';
import { ITodo, Priority, TodoStore } from '../../store/todo-store';
import { PomodoroChangeValues } from '../../components/pomodoro-change-values/pomodoro-change-values';
import { FlagIcon } from '../../icons/flag-icon/flag-icon';
import { SliceTitlePipe } from '../../pipes/slice-title-pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { isDateEqual } from '../../utils/is-date-equal';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-todo-settings-modal',
  imports: [
    PomodoroChangeValues,
    FlagIcon,
    SliceTitlePipe,
    MatIconModule,
    MatDatepickerModule,
    NgClass,
  ],
  templateUrl: './todo-settings-modal.html',
  styleUrl: './todo-settings-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoSettingsModal {
  public todo = input.required<ITodo>();
  readonly store = inject(TodoStore);

  public fourArray = Array.from({ length: 4 });
  public close = input.required<() => void>();

  private el = inject(ElementRef);

  public isCalendarOpen = signal(false);

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.close()();
    }
  }

  public createdDate = computed(() => {
    const [day, month, year] = this.todo().timeCreate.split(',').map(Number);

    return new Date(year, month, day);
  });

  public isDayToday = computed(() => {
    const [day, month, year] = this.todo().timeCreate.split(',').map(Number);

    const todoDate = new Date(year, month - 1, day);
    const today = new Date();

    return isDateEqual(today, todoDate);
  });

  public isDayTomorrow = computed(() => {
    const [day, month, year] = this.todo().timeCreate.split(',').map(Number);
    const todoDate = new Date(year, month - 1, day);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    return isDateEqual(todoDate, tomorrow);
  });

  public toggleCalendar(): void {
    this.isCalendarOpen.update((value) => !value);
  }

  public priorities: Priority[] = [
    'No priority',
    'Low priority',
    'Medium priority',
    'High priority',
  ];

  public changeDateButtonHandler(day: string) {
    const date = new Date();

    if (day === 'tomorrow') {
      date.setDate(date.getDate() + 1);
    }

    const formattedDate = `${date.getDate()}, ${
      date.getMonth() + 1
    }, ${date.getFullYear()}`;

    this.store.changeTodoDate(this.todo().idTodo, formattedDate);
    this.close()();
  }

  public onDateChange(event: Date): void {
    const formattedDate = `${event.getDate()}, ${
      event.getMonth() + 1
    }, ${event.getFullYear()}`;

    this.store.changeTodoDate(this.todo().idTodo, formattedDate);
    this.toggleCalendar();
    this.close()();
  }

  public isActiveFlag(index: number): boolean {
    const currentPriority = this.todo().priority;

    const priorityIndex = this.priorities.indexOf(currentPriority);

    return index === priorityIndex;
  }

  public getFlagClass(index: number): string {
    const isActive = this.isActiveFlag(index);
    const baseClass = 'icon icon__priority-flag';

    const priorityClasses = [
      `${baseClass} priority_no`,
      `${baseClass} priority_low`,
      `${baseClass} priority_medium`,
      `${baseClass} priority_high`,
    ];

    if (isActive) {
      return `${priorityClasses[index]} icon__priority-flag_active`;
    }

    return priorityClasses[index] || baseClass;
  }

  public setPriority(priority: Priority): void {
    this.store.todoChangePriority(this.todo().idTodo, priority);
    this.close()();
  }

  public deleteTodoHandler() {
    this.store.todoDelete(this.todo().idTodo);
    this.close()();
  }
}
