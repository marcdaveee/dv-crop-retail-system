import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarNavComponent } from './sidebar-nav/sidebar-nav.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { ConfirmDeleteComponent } from './dialogs/confirm-delete/confirm-delete.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@NgModule({
  declarations: [SidebarNavComponent, HeaderComponent, ConfirmDeleteComponent],
  imports: [CommonModule, RouterModule, MatDialogModule, MatIcon],
  exports: [SidebarNavComponent, HeaderComponent],
})
export class SharedModule {}
