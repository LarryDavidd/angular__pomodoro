import { createAction } from '@ngrx/store';

export const setAuthenticated = createAction('[Auth] Set Authenticated', (authenticated: boolean) => ({ authenticated }));

export const setIsAdmin = createAction('[Auth] Set Is Admin', (isAdmin: boolean) => ({ isAdmin }));

export const setIsAdminUpdated = createAction('[Auth] Set Is Admin Updated ', (isAdminUpdated: boolean) => ({ isAdminUpdated }));
