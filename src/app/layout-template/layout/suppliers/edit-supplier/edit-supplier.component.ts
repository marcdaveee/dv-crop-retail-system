import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SupplierService } from '../../../../services/supplier.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ISupplier } from '../../../../models/ISupplier.interface';
import { AlertService } from '../../../../services/alert.service';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrl: './edit-supplier.component.css',
})
export class EditSupplierComponent implements OnInit {
  editSupplierForm!: FormGroup;
  supplierToUpdate?: ISupplier;
  isFormSubmitted = false;
  errorMessage?: string = '';

  constructor(
    private _supplierService: SupplierService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getSupplier();

    this.editSupplierForm = new FormGroup({
      firstname: new FormControl(
        this.supplierToUpdate?.firstName,
        Validators.required
      ),
      lastname: new FormControl(
        this.supplierToUpdate?.lastName,
        Validators.required
      ),
      address: new FormControl(
        this.supplierToUpdate?.address,
        Validators.minLength(3)
      ),
      contactNo: new FormControl(
        this.supplierToUpdate?.contactNo,
        Validators.minLength(11)
      ),
      email: new FormControl(this.supplierToUpdate?.email, Validators.email),
    });
  }

  getSupplier() {
    const supplierId = this._route.snapshot.params['id'];

    this._supplierService.getSupplierById(supplierId).subscribe({
      next: (res) => {
        this.supplierToUpdate = res;
        console.log(this.supplierToUpdate);
        this.editSupplierForm.patchValue({
          firstname: this.supplierToUpdate.firstName,
          lastname: this.supplierToUpdate.lastName,
          address: this.supplierToUpdate.address,
          contactNo: this.supplierToUpdate.contactNo,
          email: this.supplierToUpdate.email,
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
    console.log(this.editSupplierForm.value);
    this.isFormSubmitted = true;

    if (this.editSupplierForm.valid) {
      const updatedSupplier: ISupplier = {
        id: this.supplierToUpdate!.id,
        firstName: this.editSupplierForm.value.firstname,
        lastName: this.editSupplierForm.value.lastname,
        address: this.editSupplierForm.value.address,
        contactNo: this.editSupplierForm.value.contactNo,
        email: this.editSupplierForm.value.email,
      };

      this._supplierService.updateSupplier(updatedSupplier).subscribe({
        next: () => {
          this._router.navigate(['/suppliers']);
          this.isFormSubmitted = false;
          this._alertService.showAlertSuccess('Supplier was updated');
        },
        error: (error) => {
          console.log('Error occured.', error.message);
          this.isFormSubmitted = false;
        },
      });
    }
  }
}
