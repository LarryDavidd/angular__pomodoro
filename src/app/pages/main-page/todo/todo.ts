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
import { ITodo, TodoStore } from '../../../store/todo-store';
import { MatIconModule } from '@angular/material/icon';
import { TomatoIcon } from '../../../icons/tomato-icon/tomato-icon';
import { NgClass } from '@angular/common';
import { SettingIcon } from '../../../icons/settings-icon/settings-icon';
import { TodoSettingsModal } from '../../../ui/todo-settings-modal/todo-settings-modal';
import { isDateEqual } from '../../../utils/is-date-equal';

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
  public isModalSettingsOpen = signal(false);

  public todoCompleteHandler(idTodo: string): void {
    this.store.todoChangeComplete(idTodo);
  }

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

  public createArray(length: number): string[] {
    return Array.from({ length });
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
}
