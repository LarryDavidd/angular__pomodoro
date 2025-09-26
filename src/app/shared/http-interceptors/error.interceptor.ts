import { inject, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HttpHandler,
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  authService = inject(AuthService);

  intercept<T>(request: HttpRequest<T>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // A client-side or network error occurred. Handle it accordingly.
          this.authService.logout();
        }
        // else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        // console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
        // }
        // If you want to return a new response:
        // return of(new HttpResponse({body: [{name: "Default value..."}]}));
        // If you want to return the error on the upper level:
        // return next.handle(request);
        // throw error;

        return throwError(() => error);
        // or just return nothing:
        // return EMPTY;
      })
    );
  }
}
