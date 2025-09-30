import { inject, Injectable } from '@angular/core';
import { TodoStore } from '../store/todo-store';

@Injectable({
  providedIn: 'root',
})
export class ThemeLocalStorage {
  private store = inject(TodoStore);

  constructor() {
    this.initTheme();
  }

  public getThemeLocalStorage() {
    return localStorage.getItem('themeApp');
  }

  public setThemeLocalStorage(setTheme: 'dark' | 'light') {
    localStorage.setItem('themeApp', setTheme);
  }

  private initTheme() {
    const localStorageTheme = this.getThemeLocalStorage();
    const root = document.documentElement;

    if (localStorageTheme) {
      if (localStorageTheme === 'dark') {
        root.dataset['theme'] = 'dark';
        this.store.changeThemeApplication(localStorageTheme);
      } else if (localStorageTheme === 'light') {
        delete root.dataset['theme'];
        this.store.changeThemeApplication(localStorageTheme);
      }
    }
  }
}
