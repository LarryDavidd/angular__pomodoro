import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import * as AuthActions from './store/auth.actions';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly store: Store
  ) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isAuthenticated = this.isAuthenticated();

    if (state.url === '/') {
      return true;
    }

    if (state.url === '/signin' && isAuthenticated) {
      this.router.navigate(['/']);

      return true;
    } else if (!isAuthenticated && state.url !== '/signin') {
      this.router.navigate(['/signin']);

      return false;
    }

    return true;
  }

  private isAuthenticated(): boolean {
    const isAuthenticated = this.authService.isAuthenticatedUser();
    this.store.dispatch(AuthActions.setAuthenticated(isAuthenticated));

    return isAuthenticated;
  }
}
