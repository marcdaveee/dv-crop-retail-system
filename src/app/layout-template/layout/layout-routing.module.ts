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
import { AddIncomingTransactionComponent } from './transactions/add-incoming-transaction/add-incoming-transaction.component';
import { AddOutgoingTransactionComponent } from './transactions/add-outgoing-transaction/add-outgoing-transaction.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../../helpers/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,

    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'transactions',
        component: TransactionsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'new-incoming',
        component: AddIncomingTransactionComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'new-outgoing',
        component: AddOutgoingTransactionComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'customers',
        component: CustomersComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'customers/add-new',
        component: AddCustomerComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'suppliers',
        component: SuppliersComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'suppliers/add-new',
        component: AddSupplierComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'customers/edit/:id',
        component: EditCustomerComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'suppliers/edit/:id',
        component: EditSupplierComponent,
        pathMatch: 'prefix',
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
