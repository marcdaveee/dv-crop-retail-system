import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../layout-template/shared/dialogs/confirm-delete/confirm-delete.component';
import { ConfirmSaveComponent } from '../layout-template/shared/dialogs/confirm-save/confirm-save.component';
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

  openConfirmSaveDialog(msg: string) {
    return this.dialog.open(ConfirmSaveComponent, {
      width: '500px',
      data: {
        msg: msg,
      },
      disableClose: true,
    });
  }
}
