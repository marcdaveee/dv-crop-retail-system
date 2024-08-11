import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SupplierService } from '../../../../services/supplier.service';
import { Router } from '@angular/router';
import { ISupplier } from '../../../../models/ISupplier.interface';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrl: './add-supplier.component.css',
})
export class AddSupplierComponent implements OnInit {
  addSupplierForm!: FormGroup;

  isFormSubmitted = false;

  constructor(
    private _supplierService: SupplierService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.addSupplierForm = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.minLength(3)),
      contactNo: new FormControl(null, Validators.minLength(11)),
      email: new FormControl(null, Validators.email),
    });
  }

  onSubmit() {
    this.isFormSubmitted = true;
    console.log(this.addSupplierForm.value);

    if (this.addSupplierForm.valid) {
      const newSupplier: ISupplier = {
        firstName: this.addSupplierForm.value.firstname,
        lastName: this.addSupplierForm.value.lastname,
        address: this.addSupplierForm.value.address,
        contactNo: this.addSupplierForm.value.contactNo,
        email: this.addSupplierForm.value.email,
      };

      this._supplierService.addNewSupplier(newSupplier).subscribe({
        next: () => {
          this._router.navigate(['/suppliers']);
          this.isFormSubmitted = false;
        },
        error: (error) => {
          console.log('Error occured.', error.message);
          this.isFormSubmitted = false;
        },
      });
    }
  }
}
