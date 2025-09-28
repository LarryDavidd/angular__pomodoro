import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseError } from './models/response-error';
import { SignUpResponseData } from './models/signup-response';
import { Observable } from 'rxjs';
import { SignInResponseData } from './models/signin-response';
import { Router } from '@angular/router';
import * as AuthActions from './store/auth.actions';
import { Store } from '@ngrx/store';

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  private isAuthenticated = false;

  private authSecretKey = 'authToken';

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly store: Store
  ) {
    this.isAuthenticated = !!localStorage.getItem(this.authSecretKey);
  }

  refreshToken(): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.apiUrl}/refresh`, {});
  }

  public isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  public getAuthToken(): string | null {
    return localStorage.getItem(this.authSecretKey);
  }

  public logout(): void {
    localStorage.removeItem(this.authSecretKey);
    this.isAuthenticated = false;

    this.store.dispatch(AuthActions.setIsAdminUpdated(false));
    this.store.dispatch(AuthActions.setAuthenticated(false));
    this.store.dispatch(AuthActions.setIsAdmin(false));

    this.router.navigate(['signin']);
  }

  public signUp(
    email: string,
    password: string,
    password_confirmation: string
  ): Observable<SignUpResponseData> {
    const data = { email, password, password_confirmation };
    const responseData: SignUpResponseData = {
      success: false,
      reason: '',
    };

    return new Observable((observer) => {
      this.http.post(`${this.apiUrl}/register`, data).subscribe(
        (_response: NonNullable<unknown>) => {
          responseData.success = true;
          observer.next(responseData);
          observer.complete();
        },
        (error: ResponseError) => {
          if (error.status === 400) {
            responseData.reason = error.error.reason;
          }

          observer.next(responseData);
          observer.complete();
        }
      );
    });
  }

  public signIn(
    email: string,
    password: string
  ): Observable<SignInResponseData> {
    const data = { email, password };
    const signInData: SignInResponseData = {
      success: false,
      message: '',
      reason: '',
    };

    return new Observable((observer) => {
      this.http.post(`${this.apiUrl}/login`, data).subscribe(
        (response) => {
          const res = response as { access_token: string };

          signInData.success = true;
          localStorage.setItem(this.authSecretKey, res.access_token);
          this.isAuthenticated = true;

          this.store.dispatch(AuthActions.setAuthenticated(true));

          observer.next(signInData);

          observer.complete();
        },
        (error: ResponseError) => {
          signInData.message = error.error.message;
          signInData.reason = error.error.reason;

          observer.next(signInData);
          observer.complete();
        }
      );
    });
  }
}
