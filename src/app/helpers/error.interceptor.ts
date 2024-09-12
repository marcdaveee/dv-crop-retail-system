import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private _authenticationService: AuthService,
    private _alertService: AlertService,
    private _router: Router
  ) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        if (err) {
          console.log(err);
          switch (err.status) {
            case 0:
              this._alertService.showAlertSuccess(
                'Server Error Occured. Kindly inform your developer.'
              );
              break;
            case 401:
              this._alertService.showAlertSuccess(
                'Invalid Credentials. Please try again.'
              );
              this._router.navigate(['/login']);
              break;

            case 500:
              this._alertService.showAlertSuccess(
                'Server Error occured. Kindly contact your developer.'
              );
              break;
          }
        }

        throw err;
      })
    );
  }
}
