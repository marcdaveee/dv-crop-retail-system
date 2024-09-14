import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { AlertService } from '../../../services/alert.service';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrl: './sidebar-nav.component.css',
})
export class SidebarNavComponent {
  logoutForm: FormGroup;
  constructor(
    private _authService: AuthService,
    private _alertService: AlertService,
    private _router: Router
  ) {
    this.logoutForm = new FormGroup({});
  }

  logOut() {
    this._authService.logout();
    this._alertService.showAlertSuccess('You are logged out.');
    this._router.navigate(['/login']);
  }
}
