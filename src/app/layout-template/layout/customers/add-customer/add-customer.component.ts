import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../services/alert.service';
import { CustomerService } from '../../../../services/customer.service';
import { Router } from '@angular/router';
import { ICustomer } from '../../../../models/ICustomer.interface';
import { DialogService } from '../../../../services/dialog.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css',
})
export class AddCustomerComponent {
  addCustomerForm!: FormGroup;

  isFormSubmitted = false;

  constructor(
    private _customerService: CustomerService,
    private _alertService: AlertService,
    private _router: Router,
    private _dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.addCustomerForm = new FormGroup({
      companyName: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.minLength(3)),
      contactNo: new FormControl(null, Validators.minLength(11)),
      email: new FormControl(null, Validators.email),
    });
  }

  onSubmit() {
    this._dialogService.openConfirmDialog('');
    this.isFormSubmitted = true;
    console.log(this.addCustomerForm.value);

    if (this.addCustomerForm.valid) {
      const newCustomer: ICustomer = {
        name: this.addCustomerForm.value.companyName,
        address: this.addCustomerForm.value.address,
        contactNo: this.addCustomerForm.value.contactNo,
        email: this.addCustomerForm.value.email,
      };

      this._customerService.addNewCustomer(newCustomer).subscribe({
        next: () => {
          this._router.navigate(['/customers']);
          this.isFormSubmitted = false;
          this._alertService.showAlertSuccess('New Customer was Added');
        },
        error: (error) => {
          console.log('Error occured.', error.message);
          this.isFormSubmitted = false;
        },
      });
    }
  }
}
