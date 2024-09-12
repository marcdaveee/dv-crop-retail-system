import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    const currentUser = this._authService.currentUserValue;
    console.log(currentUser);
    if (currentUser !== null) {
      // if user is logged in, return true
      console.log('logged in');
      return true;
    }

    // if not logged in, redirect user to the login page
    console.log('logged out');
    this._router.navigate(['/login'], {
      queryParams: { returnUrl: state.url },
    });

    console.log('logged out');
    return false;
  }
}
