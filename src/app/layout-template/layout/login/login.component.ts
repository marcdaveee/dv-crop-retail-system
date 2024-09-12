import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ILoginRequest } from '../../../models/IAuth.inteface';
import { first } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  logInForm!: FormGroup;
  isSubmitted = false;
  returnUrl = '';
  error = '';

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _alertService: AlertService
  ) {
    this.logInForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });

    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.logInForm.valid) {
      const loginReq: ILoginRequest = {
        email: this.logInForm.value.email,
        password: this.logInForm.value.password,
      };
      this._authService
        .login(loginReq)
        .pipe(first())
        .subscribe({
          next: (data) => {
            this._router.navigate([this.returnUrl]);
            this._alertService.showAlertSuccess('Login Successfully');
          },
          error: (err) => {
            this.error = err;
            console.log(err);
          },
        });
    }
  }
}
