import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICustomer } from '../../../../models/ICustomer.interface';
import { CustomerService } from '../../../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../../services/alert.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.css',
})
export class EditCustomerComponent {
  editCustomerForm!: FormGroup;
  customerToUpdate?: ICustomer;
  isFormSubmitted = false;
  errorMessage?: string = '';

  constructor(
    private _customerService: CustomerService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getSupplier();

    this.editCustomerForm = new FormGroup({
      companyName: new FormControl(
        this.customerToUpdate?.name,
        Validators.required
      ),
      address: new FormControl(
        this.customerToUpdate?.address,
        Validators.minLength(3)
      ),
      contactNo: new FormControl(
        this.customerToUpdate?.contactNo,
        Validators.minLength(11)
      ),
      email: new FormControl(this.customerToUpdate?.email, Validators.email),
    });
  }

  getSupplier() {
    const customerId = this._route.snapshot.params['id'];

    this._customerService.getCustomerById(customerId).subscribe({
      next: (res) => {
        this.customerToUpdate = res;
        console.log('Res:', this.customerToUpdate);
        this.editCustomerForm.patchValue({
          companyName: this.customerToUpdate.name,
          address: this.customerToUpdate.address,
          contactNo: this.customerToUpdate.contactNo,
          email: this.customerToUpdate.email,
        });
      },
      error: (error) => {
        if (error.status === 404) {
          console.log('Not found', error.message);
          this.errorMessage = 'Error occured. Error: ' + error.message;
        }
      },
    });
  }

  onSubmit() {
    console.log(this.editCustomerForm.value);
    this.isFormSubmitted = true;

    if (this.editCustomerForm.valid) {
      const updatedCustomer: ICustomer = {
        id: this.customerToUpdate?.id,
        name: this.editCustomerForm.value.companyName,
        address: this.editCustomerForm.value.address,
        contactNo: this.editCustomerForm.value.contactNo,
        email: this.editCustomerForm.value.email,
      };

      this._customerService.updateCustomer(updatedCustomer).subscribe({
        next: () => {
          this._router.navigate(['/customers']);
          this.isFormSubmitted = false;
          this._alertService.showAlertSuccess('Customer was updated');
        },
        error: (error) => {
          console.log('Error occured.', error.message);
          this.isFormSubmitted = false;
        },
      });
    }
  }
}
