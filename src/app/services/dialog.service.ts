import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../layout-template/shared/dialogs/confirm-delete/confirm-delete.component';
@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openConfirmDialog() {
    this.dialog.open(ConfirmDeleteComponent, {
      width: '450px',

      disableClose: true,
    });
  }
}
