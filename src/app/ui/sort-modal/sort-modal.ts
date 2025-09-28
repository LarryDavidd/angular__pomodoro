import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
} from '@angular/core';
import { SortTodos, TodoStore } from '../../store/todo-store';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sort-modal',
  imports: [NgClass, MatIconModule],
  templateUrl: './sort-modal.html',
  styleUrl: './sort-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortModal {
  readonly state = inject(TodoStore);
  private el = inject(ElementRef);
  public close = input.required<() => void>();

  public selectedSort = this.state.sort;

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.close()();
    }
  }

  public isActive(sort: SortTodos): boolean {
    return this.selectedSort() === sort;
  }

  public selectSort(str: SortTodos): void {
    this.state.changeTodosSort(str);
    this.close()();
  }
}
