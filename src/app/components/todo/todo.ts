/* eslint-disable unicorn/no-new-array */
/* eslint-disable unicorn/no-array-reverse */
/* eslint-disable unicorn/consistent-function-scoping */
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { ITodo, TodoStore } from '../../store/todo-store';
import { MatIconModule } from '@angular/material/icon';
import { TomatoIcon } from '../../icons/tomato-icon/tomato-icon';
import { NgClass } from '@angular/common';
import { SettingIcon } from '../../icons/settings-icon/settings-icon';
import { TodoSettingsModal } from '../../ui/todo-settings-modal/todo-settings-modal';
import { isDateEqual } from '../../utils/is-date-equal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  imports: [MatIconModule, TomatoIcon, NgClass, SettingIcon, TodoSettingsModal],
  templateUrl: './todo.html',
  styleUrl: './todo.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Todo {
  readonly store = inject(TodoStore);
  public todo = input.required<ITodo>();

  public showTimerNav = input(true);
  public showSettings = input(true);
  public showDate = input(true);

  public isModalSettingsOpen = signal(false);
  private selectedTodoId = this.store.selectedTodoId;
  private router = inject(Router);

  public todoCompleteHandler(idTodo: string): void {
    this.store.todoChangeComplete(idTodo);
  }

  public getPomodoroDisplay = computed((): number[] => {
    const total = Math.min(this.todo().pomodoroValue, 5);
    const complete = Math.min(this.todo().pomodoroValueComplete, total);

    return [
      ...new Array(complete).fill(1),
      ...new Array(total - complete).fill(0),
    ];
  });

  public isOverdue = computed(() => {
    const [day, month, year] = this.todo().timeCreate.split(', ').map(Number);
    const todoDate = new Date(year, month - 1, day);
    const today = new Date();

    return (
      todoDate <
      new Date(today.getFullYear(), today.getMonth(), today.getDate())
    );
  });

  public getFormattedDate(timeCreate: string): string {
    const [day, month, year] = timeCreate.split(', ').map(Number);
    const todoDate = new Date(year, month - 1, day);

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (isDateEqual(todoDate, today)) {
      return 'Сегодня';
    }

    if (isDateEqual(todoDate, tomorrow)) {
      return 'Завтра';
    }

    const months = [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря',
    ];

    return `${day} ${months[month - 1]}`;
  }

  public isNumberMoreFive(value: number): boolean {
    return value <= 5;
  }

  public openModalSettings() {
    this.isModalSettingsOpen.update((value) => !value);
  }

  public closeModal = () => {
    this.isModalSettingsOpen.set(false);
  };

  public getBorderClass = computed(() => {
    if (this.todo().isComplete) {
      return `circle__todo`;
    }

    const transformText = this.todo()
      .priority.split(' ')
      .map((el) => `${el.toLowerCase()}`)
      .reverse()
      .join('_');

    return `circle__todo ${transformText}`;
  });

  public navigateToTimer(): void {
    this.router.navigate(['timer']);
    this.store.addSelectedTodoId(this.todo().idTodo);
  }

  public todoIsActive(): boolean {
    return this.todo().idTodo === this.selectedTodoId() && !this.showTimerNav();
  }

  public changeSelectedId(): void {
    this.store.addSelectedTodoId(this.todo().idTodo);
    console.log(this.store.selectedTodoId());
  }
}
