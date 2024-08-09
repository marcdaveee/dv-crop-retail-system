import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout-template/layout/layout.module';
import { SharedModule } from './layout-template/shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, LayoutModule, SharedModule],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
