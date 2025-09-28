import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { filterByPeriod } from '../utils/filter-by-period';

export type Priority =
  | 'No priority'
  | 'Low priority'
  | 'Medium priority'
  | 'High priority';

export type SortTodos = 'project_order' | 'priority_order';
export type Periods = 'today' | 'tomorrow' | 'all';

export interface ITodo {
  idTodo: string;
  pomodoroValue: number;
  title: string;
  timeCreate: string;
  isComplete: boolean;
  priority: Priority;
  pomodoroValueComplete: number;
  timeSpent: number;
}

export interface TodoState {
  estimatedTime: string;
  timeSpent: string;
  todos: ITodo[];
  isLoading: boolean;
  error: undefined;
  sort: SortTodos;
  selectedPeriod: Periods;
  selectedTodoId: string;
  timerPomodoro: string;
  timerRestPomodoro: string;
}

const initTodoState: TodoState = {
  estimatedTime: '',
  timeSpent: '',
  todos: [],
  isLoading: false,
  error: undefined,
  sort: 'project_order',
  selectedPeriod: 'today',
  selectedTodoId: '',
  timerPomodoro: '01:00',
  timerRestPomodoro: '01:00',
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
        pomodoroValueComplete: 0,
        timeCreate: `${new Date().getDate()}, ${
          new Date().getMonth() + 1
        }, ${new Date().getFullYear()}`,
        isComplete: false,
        priority: 'No priority',
        timeSpent: 0,
      };
      console.log(objectTodo, 'new');
      patchState(store, {
        todos: [...store.todos(), objectTodo],
      });
    },

    loadPageTodo(): void {
      patchState(store, { isLoading: true });

      const mockData: Partial<TodoState> = {
        timeSpent: '0',
        isLoading: false,
      };

      patchState(store, mockData);
    },

    changeTodosSort(sort: SortTodos): void {
      patchState(store, {
        sort: sort,
      });
    },

    addSelectedTodoId(idTodo: string): void {
      patchState(store, {
        selectedTodoId: idTodo,
      });
    },

    clearSelectedTodoId(): void {
      patchState(store, {
        selectedTodoId: '',
      });
    },

    changeTodoDate(idTodo: string, date: string): void {
      patchState(store, {
        todos: store.todos().map((todo) => {
          if (idTodo === todo.idTodo) {
            return {
              ...todo,
              timeCreate: date,
            };
          }

          return todo;
        }),
      });
    },

    increaseTimeSpent(idTodo: string): void {
      patchState(store, {
        todos: store.todos().map((todo) => {
          if (idTodo === todo.idTodo) {
            const [minutes] = store.timerPomodoro().split(':').map(Number);

            return {
              ...todo,
              timeSpent: todo.timeSpent + minutes,
            };
          }

          return todo;
        }),
      });
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

    increasePomodoroValueComplete(idTodo: string, valueComplete: number): void {
      patchState(store, {
        todos: store.todos().map((todo) => {
          if (todo.idTodo === idTodo) {
            return {
              ...todo,
              pomodoroValueComplete: valueComplete,
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

    changeSelectedPeriod(period: Periods): void {
      patchState(store, {
        selectedPeriod: period,
      });
    },

    updateTimerPomodoro(timer: string): void {
      patchState(store, {
        timerPomodoro: timer,
      });
    },

    updateTimerRestPomodoro(timer: string): void {
      patchState(store, {
        timerRestPomodoro: timer,
      });
    },
  })),

  withComputed((store) => ({
    isEmptyTodos: computed(() => store.todos().length === 0),

    completedTodos: computed(() => {
      const period = store.selectedPeriod();
      return store
        .todos()
        .filter((todo) => todo.isComplete && filterByPeriod(todo, period));
    }),

    uncompletedTodos: computed(() => {
      const period = store.selectedPeriod();
      return store
        .todos()
        .filter((todo) => !todo.isComplete && filterByPeriod(todo, period));
    }),

    highPriorityTodos: computed(() =>
      store
        .todos()
        .filter((todo) => !todo.isComplete && todo.priority === 'High priority')
    ),

    mediumPriorityTodos: computed(() =>
      store
        .todos()
        .filter(
          (todo) => !todo.isComplete && todo.priority === 'Medium priority'
        )
    ),

    lowPriorityTodos: computed(() =>
      store
        .todos()
        .filter((todo) => !todo.isComplete && todo.priority === 'Low priority')
    ),

    noPriorityTodos: computed(() =>
      store
        .todos()
        .filter((todo) => !todo.isComplete && todo.priority === 'No priority')
    ),

    selectedTodo: computed(() => {
      const selectedId = store.selectedTodoId();
      console.log('change selected');
      if (!selectedId) return;
      return store.todos().find((todo) => todo.idTodo === selectedId);
    }),

    // eslint-disable-next-line unicorn/no-array-sort
    currentSort: computed(() => store.sort()),
    currentPeriod: computed(() => store.selectedPeriod()),
    currentTimerPomodoro: computed(() => store.timerPomodoro()),
    currentTimerRestPomodoro: computed(() => store.timerRestPomodoro()),

    totalTimeSpent: computed(() => {
      const period = store.selectedPeriod();
      const filterTodos = store
        .todos()
        .filter((todo) => filterByPeriod(todo, period));

      const sumSpentTime = filterTodos.reduce(
        (acc, curr) => acc + curr.timeSpent,
        0
      );
      return sumSpentTime;
    }),
  }))
);
