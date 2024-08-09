import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomersComponent } from './customers/customers.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LayoutRoutingModule } from './layout-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { SupplierItemComponent } from './suppliers/supplier-item/supplier-item.component';

@NgModule({
  declarations: [
    LayoutComponent,
    DashboardComponent,
    CustomersComponent,
    SuppliersComponent,
    TransactionsComponent,
    SupplierItemComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    LayoutRoutingModule,
    MatIconModule,
  ],
})
export class LayoutModule {}
