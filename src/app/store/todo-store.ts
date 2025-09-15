import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

export type Priority =
  | 'No priority'
  | 'Low priority'
  | 'Medium priority'
  | 'High priority';

export interface ITodo {
  idTodo: string;
  pomodoroValue: number;
  title: string;
  timeCreate: string;
  isComplete: boolean;
  priority: Priority;
}

export interface TodoState {
  dayTodo: string;
  estimatedTime: string;
  timeSpent: string;
  todos: ITodo[];
  isLoading: boolean;
  error: undefined;
}

const initTodoState: TodoState = {
  dayTodo: '',
  estimatedTime: '',
  timeSpent: '',
  todos: [],
  isLoading: false,
  error: undefined,
};

export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState(initTodoState),

  withMethods((store) => ({
    addTodo({ title, pomodoro }: { title: string; pomodoro: number }): void {
      const objectTodo: ITodo = {
        idTodo: crypto.randomUUID(),
        title: title,
        pomodoroValue: pomodoro,
        timeCreate: `${new Date().getDate()}, ${
          new Date().getMonth() + 1
        }, ${new Date().getFullYear()}`,
        isComplete: false,
        priority: 'No priority',
      };
      console.log(objectTodo, 'new');
      patchState(store, {
        todos: [...store.todos(), objectTodo],
      });
    },

    loadPageTodo(): void {
      patchState(store, { isLoading: true });

      const mockData: Partial<TodoState> = {
        dayTodo: 'Сегодня',
        estimatedTime: '0',
        timeSpent: '0',
        isLoading: false,
      };

      patchState(store, mockData);
    },

    todoChangeComplete(idTodo: string): void {
      patchState(store, {
        todos: store.todos().map((todo) => {
          if (todo.idTodo === idTodo) {
            return {
              ...todo,
              isComplete: !todo.isComplete,
            };
          }
          return todo;
        }),
      });
    },

    todoChangePomodoroValue(idTodo: string, pomodoro: number): void {
      patchState(store, {
        todos: store.todos().map((todo) => {
          if (todo.idTodo === idTodo) {
            return {
              ...todo,
              pomodoroValue: pomodoro,
            };
          }

          return todo;
        }),
      });
    },

    todoChangePriority(
      idTodo: string,
      priority:
        | 'No priority'
        | 'Low priority'
        | 'Medium priority'
        | 'High priority'
    ): void {
      patchState(store, {
        todos: store.todos().map((todo) => {
          if (todo.idTodo === idTodo) {
            return {
              ...todo,
              priority: priority,
            };
          }

          return todo;
        }),
      });
    },

    todoDelete(idTodo: string): void {
      patchState(store, {
        todos: store.todos().filter((todo) => todo.idTodo !== idTodo),
      });
    },
  })),

  withComputed((store) => ({
    isEmptyTodos: computed(() => store.todos().length === 0),

    complitedTodos: computed(() =>
      store.todos().filter((todo) => todo.isComplete)
    ),

    ucompletedTodos: computed(() =>
      store.todos().filter((todo) => !todo.isComplete)
    ),
  }))
);
