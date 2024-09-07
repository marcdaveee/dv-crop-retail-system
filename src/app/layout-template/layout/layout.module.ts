import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { CustomersComponent } from './customers/customers.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LayoutRoutingModule } from './layout-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SupplierItemComponent } from './suppliers/supplier-item/supplier-item.component';
import { EditSupplierComponent } from './suppliers/edit-supplier/edit-supplier.component';
import { AddSupplierComponent } from './suppliers/add-supplier/add-supplier.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerItemComponent } from './customers/customer-item/customer-item.component';
import { AddCustomerComponent } from './customers/add-customer/add-customer.component';
import { EditCustomerComponent } from './customers/edit-customer/edit-customer.component';
import { AddIncomingTransactionComponent } from './transactions/add-incoming-transaction/add-incoming-transaction.component';
import { AddOutgoingTransactionComponent } from './transactions/add-outgoing-transaction/add-outgoing-transaction.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    LayoutComponent,
    DashboardComponent,
    CustomersComponent,
    SuppliersComponent,
    TransactionsComponent,
    SupplierItemComponent,
    EditSupplierComponent,
    AddSupplierComponent,
    CustomerItemComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    AddIncomingTransactionComponent,
    AddOutgoingTransactionComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    LayoutRoutingModule,
    MatIconModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
})
export class LayoutModule {}
