import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { CustomersComponent } from './customers/customers.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { EditSupplierComponent } from './suppliers/edit-supplier/edit-supplier.component';
import { AddSupplierComponent } from './suppliers/add-supplier/add-supplier.component';
import { AddCustomerComponent } from './customers/add-customer/add-customer.component';
import { EditCustomerComponent } from './customers/edit-customer/edit-customer.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,

    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      { path: 'transactions', component: TransactionsComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'customers/add-new', component: AddCustomerComponent },
      { path: 'suppliers', component: SuppliersComponent },
      { path: 'suppliers/add-new', component: AddSupplierComponent },
      { path: 'customers/edit/:id', component: EditCustomerComponent },
      {
        path: 'suppliers/edit/:id',
        component: EditSupplierComponent,
        pathMatch: 'prefix',
      },
    ],
  },
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
