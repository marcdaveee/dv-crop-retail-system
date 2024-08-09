import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout-template/layout/layout.module';
import { SharedModule } from './layout-template/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { provideHttpClient } from '@angular/common/http';
import { SupplierService } from './services/supplier.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MatIconModule,
    AppRoutingModule,
    LayoutModule,
    SharedModule,
  ],
  providers: [DatePipe, SupplierService, provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
