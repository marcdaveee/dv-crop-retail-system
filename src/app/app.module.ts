import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout-template/layout/layout.module';
import { SharedModule } from './layout-template/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { SupplierService } from './services/supplier.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ErrorInterceptor } from './helpers/error.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MatIconModule,
    AppRoutingModule,
    LayoutModule,
    SharedModule,
    FontAwesomeModule,
  ],

  providers: [
    DatePipe,
    SupplierService,
    provideHttpClient(),
    provideAnimationsAsync(),
    [{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
