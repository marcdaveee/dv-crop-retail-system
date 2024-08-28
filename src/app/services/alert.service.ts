import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessAlertComponent } from '../layout-template/shared/alerts/success-alert/success-alert.component';
@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private _snackBar: MatSnackBar) {}

  showAlertSuccess(msg: string) {
    return this._snackBar.openFromComponent(SuccessAlertComponent, {
      duration: 5000,
      panelClass: 'success-alert',
      data: {
        msg: msg,
      },
    });
  }
}
