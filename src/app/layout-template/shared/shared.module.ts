import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarNavComponent } from './sidebar-nav/sidebar-nav.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { ConfirmDeleteComponent } from './dialogs/confirm-delete/confirm-delete.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SuccessAlertComponent } from './alerts/success-alert/success-alert.component';

@NgModule({
  declarations: [SidebarNavComponent, HeaderComponent, ConfirmDeleteComponent, SuccessAlertComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatButtonModule,
    MatIcon,
  ],
  exports: [SidebarNavComponent, HeaderComponent],
})
export class SharedModule {}
