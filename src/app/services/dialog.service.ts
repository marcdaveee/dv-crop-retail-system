import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../layout-template/shared/dialogs/confirm-delete/confirm-delete.component';
@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openConfirmDialog(msg: string) {
    return this.dialog.open(ConfirmDeleteComponent, {
      width: '450px',
      data: {
        msg: msg,
      },
      disableClose: true,
    });
  }
}
