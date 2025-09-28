import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsAuthenticated = createSelector(selectAuthState, (authState: AuthState) => authState.isAuthenticated);

export const selectIsAdmin = createSelector(selectAuthState, (authState: AuthState) => authState.isAdmin);

export const selectIsAdminUpdated = createSelector(selectAuthState, (authState: AuthState) => authState.isAdminUpdated);
