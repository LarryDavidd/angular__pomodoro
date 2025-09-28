import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isAdminUpdated: boolean;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  isAdmin: false,
  isAdminUpdated: false
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.setAuthenticated, (state, { authenticated }) => ({ ...state, isAuthenticated: authenticated })),

  on(AuthActions.setIsAdmin, (state, { isAdmin }) => ({ ...state, isAdmin, isAdminUpdated: true })),

  on(AuthActions.setIsAdminUpdated, (state, { isAdminUpdated }) => ({ ...state, isAdminUpdated }))
);
