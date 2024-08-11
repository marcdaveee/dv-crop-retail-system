import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SupplierService } from '../../../services/supplier.service';
import { ISupplier } from '../../../models/ISupplier.interface';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.css',
})
export class SuppliersComponent implements OnInit {
  suppliers: ISupplier[] = [];
  isContentLoading = true;
  error = '';

  constructor(
    private _supplierService: SupplierService,
    private _dialogService: DialogService
  ) {}

  ngOnInit() {
    this.fetchSuppliers();
  }

  fetchSuppliers() {
    this._supplierService.getAllSuppliers().subscribe({
      next: (suppliers) => {
        this.suppliers = suppliers;
        this.isContentLoading = false;
        console.log(this.suppliers);
      },
      error: () => {
        this.error = 'Failed to load data.';
        this.isContentLoading = false;
      },
    });
  }

  deleteSupplier(supplier: ISupplier) {
    this._dialogService.openConfirmDialog();
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

  // getSuppliers() {
  //   this,
  // }

  // {
  //   next: (data: ISupplier[]) => {
  //     this.suppliers = data;
  //     console.log('Suppliers:', this.suppliers);
  //   },
  //   error: (error) => {
  //     console.log('Failed to fetch data', error);
  //   },
  // }
}
