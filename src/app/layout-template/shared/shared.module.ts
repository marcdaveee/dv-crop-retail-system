import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarNavComponent } from './sidebar-nav/sidebar-nav.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SidebarNavComponent, HeaderComponent],
  imports: [CommonModule, RouterModule],
  exports: [SidebarNavComponent, HeaderComponent],
})
export class SharedModule {}
