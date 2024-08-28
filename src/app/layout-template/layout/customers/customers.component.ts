import { Component } from '@angular/core';
import { ICustomer } from '../../../models/ICustomer.interface';
import { CustomerService } from '../../../services/customer.service';
import { DialogService } from '../../../services/dialog.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css',
})
export class CustomersComponent {
  customers: ICustomer[] = [];
  isContentLoading = true;
  error = '';

  constructor(
    private _customerService: CustomerService,
    private _dialogService: DialogService,
    private _alertService: AlertService
  ) {}

  ngOnInit() {
    this.fetchCustomers();
  }

  fetchCustomers() {
    this._customerService.getAllCustomers().subscribe({
      next: (customers) => {
        this.customers = customers;
        this.isContentLoading = false;
        console.log(this.customers);
      },
      error: () => {
        this.error = 'Failed to load data.';
        this.isContentLoading = false;
      },
    });
  }

  deleteCustomer(customer: ICustomer) {
    this._dialogService
      .openConfirmDialog('Are you sure you want to delete this customer?')
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this._customerService.deleteCustomer(customer).subscribe({
            next: () => {
              this.fetchCustomers();
              this._alertService.showAlertSuccess('Customer was deleted');
            },
            error: (error) => {
              console.log(error);
            },
          });
        }
      });

    // console.log('Delete this supplier: ', supplier);
    // this._supplierService.deleteSupplier(supplier).subscribe({
    //   next: () => {
    //     this.fetchSuppliers();
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   },
    // });
  }
}
