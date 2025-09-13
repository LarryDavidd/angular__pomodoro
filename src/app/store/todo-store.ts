import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

interface Todo {
  idTodo: string;
  pomodoroValue: number;
  title: string;
  timeCreate: string;
  isComplete: boolean;
}

interface TodoState {
  dayTodo: string;
  estimatedTime: string;
  tasksAwaiting: string;
  timeSpent: string;
  completedTasks: string;
  todos: Todo[];
  isLoading: boolean;
  error: undefined;
}

const initTodoState: TodoState = {
  dayTodo: '',
  estimatedTime: '',
  tasksAwaiting: '',
  timeSpent: '',
  completedTasks: '',
  todos: [],
  isLoading: false,
  error: undefined,
};

export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState(initTodoState),

  withMethods((store) => ({
    addTodo({ title, pomodoro }: { title: string; pomodoro: number }): void {
      const objectTodo: Todo = {
        idTodo: crypto.randomUUID(),
        title: title,
        pomodoroValue: pomodoro,
        timeCreate: `${new Date().getDate()}, ${
          new Date().getMonth() + 1
        }, ${new Date().getFullYear()}`,
        isComplete: false,
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
        tasksAwaiting: '0',
        timeSpent: '0',
        completedTasks: '0',
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
