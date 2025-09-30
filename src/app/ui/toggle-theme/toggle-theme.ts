/* eslint-disable unicorn/consistent-function-scoping */
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { ActiveThemeDirective } from '../../directives/active-theme';
import { TodoStore } from '../../store/todo-store';
import { ThemeLocalStorage } from '../../services/theme-local-storage';

@Component({
  selector: 'app-toggle-theme',
  imports: [ActiveThemeDirective],
  templateUrl: './toggle-theme.html',
  styleUrl: './toggle-theme.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleTheme {
  private store = inject(TodoStore);
  private themeLocalStorage = inject(ThemeLocalStorage);

  public themeApp = this.store.currentTheme;

  public isActive = computed(() => {
    const theme = this.themeApp();

    console.log(theme);
    if (theme === 'dark') {
      return true;
    }
    return false;
  });

  public changeThemeApp(): void {
    const theme = this.themeApp();
    const root = document.documentElement;
    const newTheme = theme === 'light' ? 'dark' : 'light';

    this.themeLocalStorage.setThemeLocalStorage(newTheme);

    if (newTheme === 'dark') {
      root.dataset['theme'] = 'dark';
    } else if (newTheme === 'light') {
      delete root.dataset['theme'];
    }

    this.store.changeThemeApplication(newTheme);
  }
}
