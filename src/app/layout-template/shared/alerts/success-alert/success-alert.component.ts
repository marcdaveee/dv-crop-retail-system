import { Component, Inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-success-alert',
  templateUrl: './success-alert.component.html',
  styleUrl: './success-alert.component.css',
})
export class SuccessAlertComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<SuccessAlertComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {}
}
