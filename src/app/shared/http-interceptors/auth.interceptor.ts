// src/app/interceptors/auth.interceptor.ts
import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, take, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

interface TokenResponse {
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

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.getTokenFromStorage();

    if (token) {
      request = this.addTokenToRequest(request, token);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && token) {
          return this.handle401Error(request, next);
        }

        return this.handleError(error);
      })
    );
  }

  private addTokenToRequest(
    request: HttpRequest<unknown>,
    token: string
  ): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private getTokenFromStorage(): string | null {
    try {
      return localStorage.getItem('jwt_token');
    } catch (error) {
      console.error('Error getting token from localStorage:', error);
      return null;
    }
  }

  private handle401Error(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.isRefreshing) {
      return this.refreshTokenSubject.pipe(
        filter((token: string | null): token is string => token !== null),
        take(1),
        switchMap((token: string) => {
          return next.handle(this.addTokenToRequest(request, token));
        })
      );
    } else {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((tokenResponse: TokenResponse) => {
          this.isRefreshing = false;
          const newToken = tokenResponse.access_token;
          this.refreshTokenSubject.next(newToken);

          return next.handle(this.addTokenToRequest(request, newToken));
        }),
        catchError((error: Error) => {
          this.isRefreshing = false;
          this.authService.logout();
          this.router.navigate(['/login']);
          return throwError(() => error);
        })
      );
    }
  }

  private handleError(
    error: HttpErrorResponse
  ): Observable<HttpEvent<unknown>> {
    switch (error.status) {
      case 403: {
        console.error('Forbidden access');
        break;
      }
      case 404: {
        console.error('Resource not found');
        break;
      }
      case 500: {
        console.error('Internal server error');
        break;
      }
      default: {
        console.error('HTTP error:', error);
        break;
      }
    }

    return throwError(() => error);
  }
}
