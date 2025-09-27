import { ITodo, Periods } from '../store/todo-store';

export function filterByPeriod(todo: ITodo, period: Periods): boolean {
  const [day, month, year] = todo.timeCreate.split(', ').map(Number);
  const today = new Date();
  const todoDate = new Date(year, month - 1, day);

  switch (period) {
    case 'today': {
      return todoDate.toDateString() === today.toDateString();
    }
    case 'tomorrow': {
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return todoDate.toDateString() === tomorrow.toDateString();
    }
    case 'all': {
      return true;
    }
  }
}
