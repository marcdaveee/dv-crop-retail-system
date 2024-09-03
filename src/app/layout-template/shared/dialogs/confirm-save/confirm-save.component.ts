import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-save',
  templateUrl: './confirm-save.component.html',
  styleUrl: './confirm-save.component.css',
})
export class ConfirmSaveComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmSaveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
